import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import SignUpForm from "./sign-up-form";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signUp: {
      email: vi.fn(),
    },
  },
}));

describe("SignUpForm Unicode code-point validation (breaking change #1)", () => {
  test("rejects astral password under 8 code points despite having 8 UTF-16 code units", async () => {
    render(<SignUpForm onSwitchToSignIn={vi.fn()} />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(nameInput, { target: { value: "Alice" } });
    fireEvent.change(emailInput, { target: { value: "alice@example.com" } });
    // "😀😀😀😀" has length 8 in UTF-16 (.length === 8), but only 4 Unicode code points.
    // In Zod 4.4 this passed minLength(8). In Zod 4.5 this is rejected because length counts code points.
    fireEvent.change(passwordInput, { target: { value: "😀😀😀😀" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Password must be at least 8 characters")).toBeDefined();
    });
  });

  test("accepts valid ASCII password with 8 or more characters", async () => {
    render(<SignUpForm onSwitchToSignIn={vi.fn()} />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(nameInput, { target: { value: "Alice" } });
    fireEvent.change(emailInput, { target: { value: "alice@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("Password must be at least 8 characters")).toBeNull();
    });
  });

  test("rejects single code point name with minLength(2)", async () => {
    render(<SignUpForm onSwitchToSignIn={vi.fn()} />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    // Single astral character: 1 code point, 2 UTF-16 units
    fireEvent.change(nameInput, { target: { value: "😀" } });
    fireEvent.change(emailInput, { target: { value: "alice@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 2 characters")).toBeDefined();
    });
  });
});
