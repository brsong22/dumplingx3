import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ItemForm } from "@/components/forms/ItemForm/ItemForm";
import { mockItem } from "@/test-utils/mockItem";

describe("ItemForm", () => {
    const onCancelMock = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
        global.fetch = jest.fn() as jest.Mock; // this gets updated in tests so we can return appropriate success status for the test
    });

    it("renders with default values", () => {
        render(<ItemForm item={mockItem} onCancel={onCancelMock} />);

        expect(screen.getByLabelText(/UPC/i)).toHaveValue(mockItem.code);
        expect(screen.getByLabelText(/Item Name/i)).toHaveValue(mockItem.name);
        expect(screen.getByLabelText(/Price/i)).toHaveValue("0.00");
        expect(screen.getByLabelText(/Store/i)).toHaveValue("");
        expect(screen.getByAltText(/product image/i)).toBeInTheDocument();
    });

    it("handles input changes", () => {
        render(<ItemForm item={mockItem} onCancel={onCancelMock} />);

        const nameInput = screen.getByLabelText(/Item Name/i);
        fireEvent.change(nameInput, { target: { value: "Delicious Dumps" } });

        expect(nameInput).toHaveValue("Delicious Dumps");
    });

    it("formats price input as currency", () => {
        render(<ItemForm item={mockItem} onCancel={onCancelMock} />);

        const priceInput = screen.getByLabelText(/Price/i);
        fireEvent.change(priceInput, { target: { value: "499" } });

        expect(priceInput).toHaveValue("4.99");
    });

    it("submits the form and calls onCancel", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            json: async () => ({ success: true }),
        } as Response);

        render(<ItemForm item={mockItem} onCancel={onCancelMock} />);

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith("/api/items", expect.any(Object));
            expect(onCancelMock).toHaveBeenCalled();
        });
    });

    it("handles failed submission", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            json: async () => ({ success: false }),
        } as Response);

        render(<ItemForm item={mockItem} onCancel={onCancelMock} />);

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            expect(screen.getByText(/Error occured/i)).toBeInTheDocument();
        });
    });

    it("calls onCancel when cancel button is clicked", () => {
        render(<ItemForm item={mockItem} onCancel={onCancelMock} />);
        fireEvent.click(screen.getByText(/Cancel/i));

        expect(onCancelMock).toHaveBeenCalled();
    });
});
