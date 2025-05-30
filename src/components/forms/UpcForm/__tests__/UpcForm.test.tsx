import { render, screen, fireEvent } from "@testing-library/react";
import { UpcForm } from "@/components/forms/UpcForm";

describe("UpcForm", () => {
    const onSubmitMock = jest.fn();
    const onCancelMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders form elements", () => {
        render(<UpcForm onSubmit={onSubmitMock} onCancel={onCancelMock} error={null} />);

        expect(screen.getByLabelText(/UPC/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    });

    it("updates input value", () => {
        render(<UpcForm onSubmit={onSubmitMock} onCancel={onCancelMock} error={null} />);

        const input = screen.getByLabelText(/UPC/i);
        fireEvent.change(input, { target: { value: "1234567890" } });

        expect(input).toHaveValue("1234567890");
    });

    it("calls onSubmit with input value on form submission", () => {
        render(<UpcForm onSubmit={onSubmitMock} onCancel={onCancelMock} error={null} />);

        const input = screen.getByLabelText(/UPC/i);
        fireEvent.change(input, { target: { value: "0987654321" } });

        fireEvent.click(screen.getByRole("button", { name: /Search/i }));

        expect(onSubmitMock).toHaveBeenCalledWith("0987654321");
    });

    it("calls onCancel when cancel button clicked", () => {
        render(<UpcForm onSubmit={onSubmitMock} onCancel={onCancelMock} error={null} />);

        fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

        expect(onCancelMock).toHaveBeenCalledTimes(1);
    });

    it("renders error message", () => {
        render(<UpcForm onSubmit={onSubmitMock} onCancel={onCancelMock} error={"Error Occurred"} />);

        expect(screen.getByText(/Error Occurred/i)).toBeInTheDocument();
    });
});