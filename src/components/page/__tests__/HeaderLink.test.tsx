import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderLink } from "../HeaderLink";
import * as ResetProvider from "@/components/AppContentResetProvider";
import "@testing-library/jest-dom";

jest.mock("next/link", () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

describe("HeaderLink", () => {
    const resetMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(ResetProvider, "useReset").mockReturnValue({ reset: resetMock, resetFlag: false });
    });

    it("renders the link with correct text and route", () => {
        render(<HeaderLink route="/" />);
        const link = screen.getByText("Dumplingx3!").closest("a");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/");
    });

    it("calls reset when span is clicked", () => {
        render(<HeaderLink route="/" />);
        const text = screen.getByText("Dumplingx3!");
        fireEvent.click(text);

        expect(resetMock).toHaveBeenCalledTimes(1);
    });
});
