import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppContent } from "../AppContent";
import * as useLookupHook from "@/components/scanner/useLookupUpc";
import React from "react";
import { mockItem } from "@/test-utils/mockItem";

// Mock child components
jest.mock("@/components/scanner/BarcodeScannerToggle", () => ({
    BarcodeScannerToggle: ({ onClick }: { onClick: () => void }) => (
        <button onClick={onClick}>Scan Barcode</button>
    ),
}));
jest.mock("@/components/forms/ItemForm/ItemFormToggle", () => ({
    ItemFormToggle: ({ onClick }: { onClick: () => void }) => (
        <button onClick={onClick}>Enter Data</button>
    ),
}));
jest.mock("@/components/scanner/BarcodeScanner", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BarcodeScanner: ({ onDetected, onCancel }: any) => (
        <div>
            <button onClick={() => onDetected("123456789012")}>Simulate Scan</button>
            <button onClick={onCancel}>Cancel Scanner</button>
        </div>
    ),
}));
jest.mock("@/components/forms/ItemForm/ItemForm", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ItemForm: ({ onCancel }: any) => (
        <div>
            <span>Form Component</span>
            <button onClick={onCancel}>Cancel Form</button>
        </div>
    ),
}));

const mockSearchUpc = jest.fn();
const mockResetItemInfo = jest.fn();

describe("AppContent", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        global.fetch = jest.fn() as jest.Mock;
        jest.spyOn(global, "fetch").mockResolvedValue({
            json: async () => ({ data: [mockItem] }),
        } as unknown as Response);
        jest.spyOn(useLookupHook, "useLookupUpc").mockReturnValue({
            itemInfo: mockItem,
            searchUpc: mockSearchUpc,
            resetItemInfo: mockResetItemInfo,
            loading: false
        });
    });

    // unit tests
    it("renders toggle buttons initially", () => {
        render(<AppContent />);

        expect(screen.getByText(/Scan Barcode/i)).toBeInTheDocument();
        expect(screen.getByText(/Enter Data/i)).toBeInTheDocument();
    });

    it("fetches and renders items on mount", async () => {
        render(<AppContent />);

        await waitFor(() => {
            expect(screen.getByText("Yummy Dumps")).toBeInTheDocument();
        });
    });

    // integration tests

    it("shows BarcodeScanner when BarcodeScannerToggle button is clicked", () => {
        render(<AppContent />);

        fireEvent.click(screen.getByText(/Scan Barcode/i));
        expect(screen.getByText(/Simulate Scan/i)).toBeInTheDocument();
    });

    it("shows ItemForm when ItemFormToggle button is clicked", () => {
        render(<AppContent />);

        fireEvent.click(screen.getByText(/Enter Data/i));
        expect(screen.getByText(/Form Component/i)).toBeInTheDocument();
    });

    it("handles scanning and shows form on success", async () => {
        render(<AppContent />);

        fireEvent.click(screen.getByText(/Scan Barcode/i));
        fireEvent.click(screen.getByText(/Simulate Scan/i));
        await waitFor(() => {
            expect(mockSearchUpc).toHaveBeenCalledWith("123456789012");
            expect(screen.getByText(/Form Component/i)).toBeInTheDocument();
        });
    });

    it("hides scanner, resets form data, and shows toggles when Cancel Scanner is clicked", () => {
        render(<AppContent />);
        fireEvent.click(screen.getByText(/Scan Barcode/i));
        fireEvent.click(screen.getByText(/Cancel Scanner/i));
        expect(mockResetItemInfo).toHaveBeenCalled();
        expect(screen.queryByText(/Simulate Scan/i)).not.toBeInTheDocument();
    });

    it("hides form, resets form data, and shows toggles when Cancel Form is clicked", () => {
        render(<AppContent />);
        fireEvent.click(screen.getByText(/Enter Data/i));
        fireEvent.click(screen.getByText(/Cancel Form/i));
        expect(mockResetItemInfo).toHaveBeenCalled();
        expect(screen.queryByText(/Form Component/i)).not.toBeInTheDocument();
    });
});
