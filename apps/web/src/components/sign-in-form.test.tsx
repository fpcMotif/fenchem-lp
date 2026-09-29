import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import SignInForm from "./sign-in-form";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      email: vi.fn(),
    },
  },
}));

describe("SignInForm Unicode code-point validation (breaking change #1)", () => {
  test("rejects astral password under 8 code points despite having 8 UTF-16 code units", async () => {
    render(<SignInForm onSwitchToSignUp={vi.fn()} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(emailInput, { target: { value: "alice@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "😀😀😀😀" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Password must be at least 8 characters")).toBeDefined();
    });
  });

  test("accepts valid ASCII password with 8 or more characters", async () => {
    render(<SignInForm onSwitchToSignUp={vi.fn()} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(emailInput, { target: { value: "alice@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("Password must be at least 8 characters")).toBeNull();
    });
  });
});
