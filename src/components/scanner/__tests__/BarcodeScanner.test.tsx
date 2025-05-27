import { render, screen, fireEvent } from "@testing-library/react";
import { BarcodeScanner } from "../BarcodeScanner";

jest.mock("react-qr-barcode-scanner", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        default: (props: any) => (
            <div data-testid="mock-scanner">
                <button onClick={() => props.onUpdate(null, { getText: () => "12345" })}>
                    Simulate Scan
                </button>
            </div>
        ),
    };
});

describe("BarcodeScanner", () => {
    it("renders cancel icon", () => {
        render(<BarcodeScanner onDetected={() => { }} onCancel={() => { }} />);
        expect(screen.getByTestId("barcodeScannerCancelIcon")).toBeInTheDocument();
    });

    it("calls onCancel when cancel button clicked", () => {
        const onCancel = jest.fn();
        render(<BarcodeScanner onDetected={() => { }} onCancel={onCancel} />);
        fireEvent.click(screen.getByTestId("barcodeScannerCancelIcon"));
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("calls onDetected when scan detects UPC code", async () => {
        const onDetected = jest.fn();
        render(<BarcodeScanner onDetected={onDetected} onCancel={() => { }} />);

        const simulateScanBtn = await screen.findByText("Simulate Scan");
        fireEvent.click(simulateScanBtn);

        expect(onDetected).toHaveBeenCalledWith("12345");
    });
});
