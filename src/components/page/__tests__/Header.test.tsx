import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

jest.mock("../../auth/AuthButton", () => ({
    AuthButton: () => <button>Login</button>,
}));

describe("Header", () => {
    it("renders the header title with a link to home", () => {
        render(<Header />);
        const linkElement = screen.getByRole("link", { name: /dumplingx3!/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/");
    });

    it("renders the AuthButton", () => {
        render(<Header />);
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });
});
