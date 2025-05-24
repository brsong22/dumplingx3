import { render, screen, fireEvent } from "@testing-library/react";
import { ScannerToggleButton } from "../ScannerToggleButton";

describe("ScannerToggleButton", () => {
    it("renders button with icon and text", () => {
        render(<ScannerToggleButton onClick={() => { }} />);
        expect(screen.getByRole("button")).toHaveTextContent(/Scan Barcode/i);
    });

    it("calls onClick when button is clicked", () => {
        const onClick = jest.fn();
        render(<ScannerToggleButton onClick={onClick} />);
        fireEvent.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
