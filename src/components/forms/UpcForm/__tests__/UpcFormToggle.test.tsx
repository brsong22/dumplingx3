import { render, screen, fireEvent } from "@testing-library/react";
import { UpcFormToggle } from "@/components/forms/UpcForm/";

describe("UpcFormToggle", () => {
    const onClickMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the button with icon and text", () => {
        render(<UpcFormToggle onClick={onClickMock} />);

        expect(screen.getByTestId("upcFormMagnifyingGlass")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Search UPC code/i })).toBeInTheDocument();
    });

    it("calls onClick when button is clicked", () => {
        render(<UpcFormToggle onClick={onClickMock} />);

        fireEvent.click(screen.getByRole("button", { name: /Search UPC code/i }));

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
