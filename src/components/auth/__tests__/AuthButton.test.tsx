import { render, screen } from "@testing-library/react";
import { AuthButton } from "../AuthButton";
import { loadingSession, signedInSession, signedOutSession } from "@/test-utils/mockSession";
import * as nextAuth from "next-auth/react";

describe("AuthButton", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the sign in button when signed out", () => {
        jest.spyOn(nextAuth, "useSession").mockReturnValue(signedOutSession);

        render(<AuthButton />);
        const signinButton = screen.getByText("Sign In");
        expect(signinButton).toBeInTheDocument();
    });

    it("renders the sign out button when signed in", () => {
        jest.spyOn(nextAuth, "useSession").mockReturnValue(signedInSession);

        render(<AuthButton />);
        const signoutButton = screen.getByText("Sign Out");
        expect(signoutButton).toBeInTheDocument();
    });

    it("renders neither button while session is loading", () => {
        jest.spyOn(nextAuth, "useSession").mockReturnValue(loadingSession);

        render(<AuthButton />);
        expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
        expect(screen.queryByText("Sign Out")).not.toBeInTheDocument();
    });
});
