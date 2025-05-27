import { render, screen, fireEvent } from "@testing-library/react";
import { ItemFormToggle } from "../ItemFormToggle";

describe("ItemFormToggle", () => {
    it("renders the toggle button", () => {
        render(<ItemFormToggle onClick={jest.fn()} />);
        expect(screen.getByTestId("itemFormClipboardIcon")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /enter data/i })).toBeInTheDocument();
    });

    it("calls onClick when the button is clicked", () => {
        const handleClick = jest.fn();
        render(<ItemFormToggle onClick={handleClick} />);
        fireEvent.click(screen.getByRole("button", { name: /enter data/i }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
