import { render, screen, fireEvent } from "@testing-library/react";
import { BarcodeScannerToggle } from "../BarcodeScannerToggle";

describe("BarcodeScannerToggle", () => {
    it("renders button with icon and text", () => {
        render(<BarcodeScannerToggle onClick={() => { }} />);
        expect(screen.getByTestId("barcodeScannerToggleCameraIcon")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent(/Scan Barcode/i);
    });

    it("calls onClick when button is clicked", () => {
        const onClick = jest.fn();
        render(<BarcodeScannerToggle onClick={onClick} />);
        fireEvent.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
