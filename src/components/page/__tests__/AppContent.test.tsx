import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { AppContent } from "../AppContent";
import * as useLookupHook from "@/components/scanner/useLookupUpc";
import { mockItem } from "@/test-utils/mockItem";
import { mockRouter } from "@/test-utils/mockRouter";
import { withResetProvider } from "@/test-utils/resetProviderWrapper";

// Mock child components
jest.mock("@/components/scanner/BarcodeScannerToggle", () => ({
    BarcodeScannerToggle: ({ onClick }: { onClick: () => void }) => (
        <button onClick={onClick}>Scan Barcode</button>
    ),
}));
jest.mock("@/components/forms/UpcForm/UpcFormToggle", () => ({
    UpcFormToggle: ({ onClick }: { onClick: () => void }) => (
        <button onClick={onClick}>Search UPC code</button>
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
jest.mock("@/components/forms/UpcForm/UpcForm", () => ({
    UpcForm: ({ onSubmit, onCancel, error }: { onSubmit: () => void; onCancel: () => void, error: string }) => (
        <div>
            <span>Search UPC Form</span>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onSubmit}>Search</button>
            <p>{error}</p>
        </div>
    )
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
jest.mock("next/navigation", () => ({
    useRouter: () => mockRouter
}));

const mockSearchUpc = jest.fn();
const mockResetItemInfo = jest.fn();

describe("AppContent", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        global.fetch = jest.fn() as jest.Mock;
        jest.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            status: 200,
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
    it("renders toggle buttons initially", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        expect(screen.getByText(/Scan Barcode/i)).toBeInTheDocument();
        expect(screen.getByText(/Enter Data/i)).toBeInTheDocument();
    });

    it("fetches and renders items on mount", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        expect(screen.getByText("Yummy Dumps")).toBeInTheDocument();
    });

    // integration tests

    it("shows BarcodeScanner when BarcodeScannerToggle button is clicked", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        fireEvent.click(screen.getByText(/Scan Barcode/i));
        await waitFor(() => {
            expect(screen.getByText(/Simulate Scan/i)).toBeInTheDocument();
        });
    });

    it("shows UpcForm when UpcSearchToggle button is clicked", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        fireEvent.click(screen.getByText(/Search UPC code/i));
        await waitFor(() => {
            expect(screen.getByText(/Search UPC Form/i)).toBeInTheDocument();
        });
    });

    it("shows ItemForm when ItemFormToggle button is clicked", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        fireEvent.click(screen.getByText(/Enter Data/i));
        await waitFor(() => {
            expect(screen.getByText(/Form Component/i)).toBeInTheDocument();
        });
    });

    it("handles scanning and shows form on success", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        fireEvent.click(screen.getByText(/Scan Barcode/i));
        fireEvent.click(screen.getByText(/Simulate Scan/i));
        await waitFor(() => {
            expect(mockSearchUpc).toHaveBeenCalledWith("123456789012");
            expect(screen.getByText(/Form Component/i)).toBeInTheDocument();
        });
    });

    it("hides scanner and shows toggles when Cancel Scanner is clicked", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        fireEvent.click(screen.getByText(/Scan Barcode/i));
        fireEvent.click(screen.getByText(/Cancel Scanner/i));
        await waitFor(() => {
            expect(mockResetItemInfo).toHaveBeenCalled();
            expect(screen.queryByText(/Simulate Scan/i)).not.toBeInTheDocument();
        });
    });

    it("hides search upc form and shows toggles when Cancel button is clicked", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        fireEvent.click(screen.getByText(/Search UPC code/i));
        fireEvent.click(screen.getByText(/Cancel/i));
        await waitFor(() => {
            expect(mockResetItemInfo).toHaveBeenCalled();
            expect(screen.queryByText(/Search UPC Form/i)).not.toBeInTheDocument();
        });
    });

    it("hides form and shows toggles when Cancel Form is clicked", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        fireEvent.click(screen.getByText(/Enter Data/i));
        fireEvent.click(screen.getByText(/Cancel Form/i));
        await waitFor(() => {
            expect(mockResetItemInfo).toHaveBeenCalled();
            expect(screen.queryByText(/Form Component/i)).not.toBeInTheDocument();
        });
    });

    it("reset provider resets component state", async () => {
        await act(async () => render(<AppContent />, { wrapper: ({ children }) => withResetProvider(children) }));

        fireEvent.click(screen.getByText(/Enter Data/i));
        expect(screen.getByText(/Form Component/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Reset State/i));

        await waitFor(() => {
            expect(screen.getByText(/Scan Barcode/i)).toBeInTheDocument();
            expect(screen.getByText(/Search UPC code/i)).toBeInTheDocument();
            expect(screen.getByText(/Enter Data/i)).toBeInTheDocument();
        });
    });
});
