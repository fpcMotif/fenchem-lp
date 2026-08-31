import { Button } from "@fenchem-lp/ui/components/button";
import { Input } from "@fenchem-lp/ui/components/input";
import { Label } from "@fenchem-lp/ui/components/label";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

const styles = stylex.create({
  container: {
    marginInline: "auto",
    width: "100%",
    marginTop: "2.5rem",
    maxWidth: "28rem",
    padding: "1.5rem",
  },
  title: {
    marginBottom: "1.5rem",
    textAlign: "center",
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
    fontWeight: 700,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  errorText: {
    color: colors.destructive,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  submitButton: {
    width: "100%",
  },
  switchContainer: {
    marginTop: "1rem",
    textAlign: "center",
  },
  switchButton: {
    color: {
      default: colors.brandBlue600,
      ":hover": colors.brandBlue800,
    },
  },
});

export default function SignUpForm({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const navigate = useNavigate({
    from: "/",
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            void navigate({
              to: "/dashboard",
            });
            toast.success("Sign up successful");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>Create Account</h1>

      <form
        action={() => {
          void form.handleSubmit();
        }}
        {...stylex.props(styles.form)}
      >
        <div>
          <form.Field name="name">
            {(field) => {
              const error = field.state.meta.errors[0]?.message;
              const errorId = `${field.name}-error`;
              return (
                <div {...stylex.props(styles.fieldGroup)}>
                  <Label htmlFor={field.name}>Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    autoComplete="name"
                    required
                    value={field.state.value}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {error ? (
                    <p id={errorId} role="alert" {...stylex.props(styles.errorText)}>
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>
        </div>

        <div>
          <form.Field name="email">
            {(field) => {
              const error = field.state.meta.errors[0]?.message;
              const errorId = `${field.name}-error`;
              return (
                <div {...stylex.props(styles.fieldGroup)}>
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    autoComplete="email"
                    required
                    value={field.state.value}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {error ? (
                    <p id={errorId} role="alert" {...stylex.props(styles.errorText)}>
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>
        </div>

        <div>
          <form.Field name="password">
            {(field) => {
              const error = field.state.meta.errors[0]?.message;
              const errorId = `${field.name}-error`;
              return (
                <div {...stylex.props(styles.fieldGroup)}>
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    autoComplete="new-password"
                    required
                    value={field.state.value}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {error ? (
                    <p id={errorId} role="alert" {...stylex.props(styles.errorText)}>
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}
        >
          {({ canSubmit, isSubmitting }) => (
            <Button type="submit" sx={styles.submitButton} disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <div {...stylex.props(styles.switchContainer)}>
        <Button variant="link" onClick={onSwitchToSignIn} sx={styles.switchButton}>
          Already have an account? Sign In
        </Button>
      </div>
    </div>
  );
}
