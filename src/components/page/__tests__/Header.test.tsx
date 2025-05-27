import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

jest.mock("../../auth/AuthButton", () => ({
    AuthButton: () => <button>Login</button>,
}));

describe("Header", () => {
    it("renders the header title", () => {
        render(<Header />);
        const title = screen.getByText("Dumplingx3!");
        expect(title).toBeInTheDocument();
    });

    it("renders the AuthButton", () => {
        render(<Header />);
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });
});
