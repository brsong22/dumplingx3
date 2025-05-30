import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

jest.mock("../../auth/AuthButton", () => ({
    AuthButton: () => <button>Login</button>,
}));
jest.mock("../HeaderLink", () => ({
    HeaderLink: ({ route }: { route: string }) => (
        <a href={route}>Dumplingx3!</a>
    )
}));

describe("Header", () => {
    it("renders the header content", () => {
        render(<Header />);
        const title = screen.getByText("Dumplingx3!");
        expect(title).toBeInTheDocument();
        expect(title.closest("a")).toHaveAttribute("href", "/");
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });
});
