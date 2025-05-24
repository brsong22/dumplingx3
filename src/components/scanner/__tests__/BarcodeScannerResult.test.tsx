import { render, screen } from "@testing-library/react";
import { BarcodeScannerResult } from "../BarcodeScannerResult";
import { mockItem } from "@/test-utils/mockItem";

describe("ScannedResult", () => {
    it("displays UPC and no results message when result is null", () => {
        render(<BarcodeScannerResult upc="12345" result={null} />);
        expect(screen.getByText(/Scanned UPC: 12345/i)).toBeInTheDocument();
        expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    });

    it("displays product name when result exists", () => {
        render(<BarcodeScannerResult upc="12345" result={mockItem} />);
        expect(screen.getByText(/Scanned UPC: 12345/i)).toBeInTheDocument();
        expect(screen.getByText(/Yummy Dumps/i)).toBeInTheDocument();
    });
});