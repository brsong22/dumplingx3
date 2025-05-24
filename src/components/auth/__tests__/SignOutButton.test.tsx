import { fireEvent, render, screen } from "@testing-library/react";
import { SignOutButton } from "../SignOutButton";

jest.mock("next-auth/react", () => ({
    signOut: jest.fn(),
    useSession: () => ({ data: null, status: "unauthenticated" }),
}));

import { signOut } from "next-auth/react";

describe("SignOutButton", () => {
    it("renders the sign out button", () => {
        render(<SignOutButton />);
        const signOutButton = screen.getByText("Sign Out");
        expect(signOutButton).toBeInTheDocument();
    });

    it("calls next auth sign out on click", () => {
        render(<SignOutButton />);
        const signOutButton = screen.getByText("Sign Out");
        fireEvent.click(signOutButton);

        expect(signOut).toHaveBeenCalledTimes(1);
    });
});
