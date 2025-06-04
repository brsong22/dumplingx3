import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ItemForm } from "@/components/forms/ItemForm/ItemForm";
import { mockItem } from "@/test-utils/mockItem";

describe("ItemForm", () => {
    const onSubmitMock = jest.fn();
    const onCancelMock = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("renders with default values", () => {
        render(<ItemForm item={mockItem} onSubmit={onSubmitMock} onCancel={onCancelMock} error={null} />);

        expect(screen.getByLabelText(/UPC/i)).toHaveValue(mockItem.code);
        expect(screen.getByLabelText(/Item Name/i)).toHaveValue(mockItem.name);
        expect(screen.getByLabelText(/Price/i)).toHaveValue("0.00");
        expect(screen.getByLabelText(/Store/i)).toHaveValue("");
    });

    it("handles input changes", () => {
        render(<ItemForm item={mockItem} onSubmit={onSubmitMock} onCancel={onCancelMock} error={null} />);

        const nameInput = screen.getByLabelText(/Item Name/i);
        fireEvent.change(nameInput, { target: { value: "Delicious Dumps" } });

        expect(nameInput).toHaveValue("Delicious Dumps");
    });

    it("formats price input as currency", () => {
        render(<ItemForm item={mockItem} onSubmit={onSubmitMock} onCancel={onCancelMock} error={null} />);

        const priceInput = screen.getByLabelText(/Price/i);
        fireEvent.change(priceInput, { target: { value: "499" } });

        expect(priceInput).toHaveValue("4.99");
    });

    it("submits the form and calls onCancel", async () => {
        render(<ItemForm item={mockItem} onSubmit={onSubmitMock} onCancel={onCancelMock} error={null} />);

        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: "499" } });
        fireEvent.change(screen.getByLabelText(/Store/i), { target: { value: "Test Store" } });

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    upc: mockItem.code,
                    name: mockItem.name,
                    price: "4.99",
                    location: "Test Store",
                    date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
                })
            );
        });
    });

    it("handles failed submission", async () => {
        render(<ItemForm item={mockItem} onSubmit={onSubmitMock} onCancel={onCancelMock} error="Error occurred" />);

        expect(screen.getByText(/Error occurred/)).toBeInTheDocument();
    });

    it("calls onCancel when cancel button is clicked", () => {
        render(<ItemForm item={mockItem} onSubmit={onSubmitMock} onCancel={onCancelMock} error={null} />);

        fireEvent.click(screen.getByText(/Cancel/i));

        expect(onCancelMock).toHaveBeenCalled();
    });
});
