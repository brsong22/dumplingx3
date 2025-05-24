import { fireEvent, render, screen } from "@testing-library/react";
import { SignInButton } from "../SignInButton";

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
    useSession: () => ({ data: null, status: "unauthenticated" }),
}));

import { signIn } from "next-auth/react";

describe("SignInButton", () => {
    it("renders the sign in button", () => {
        render(<SignInButton />);
        const signinButton = screen.getByText("Sign In");
        expect(signinButton).toBeInTheDocument();
    });

    it("calls next auth sign in on click", () => {
        render(<SignInButton />);
        const signinButton = screen.getByText("Sign In");
        fireEvent.click(signinButton);

        expect(signIn).toHaveBeenCalledTimes(1);
    });
});
