"use client";

import { getLocalISODateTime } from "@/lib/datetimeutils";
import { OpenFoodFactsBarcodeResult } from "@/types/BarcodeResult";
import Image from "next/image";
import { useState } from "react";
import { ItemForm as Form } from "@/types/item";

interface Props {
    item: OpenFoodFactsBarcodeResult | null;
    onSubmit: (data: Form) => void;
    onCancel: () => void;
    error: string | null;
}
export function ItemForm({
    item,
    onSubmit,
    onCancel,
    error
}: Props) {
    const [formData, setFormData] = useState<Form>({
        id: item?.id,
        upc: item?.code ?? "",
        name: item?.name ?? "",
        price: "0.00",
        date: getLocalISODateTime(new Date()).split("T")[0],
        location: ""
        // image: "",
    });
    const [price, setPrice] = useState<string>("0.00");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        formData.price = price;
        // formData.image = item?.image ?? "";

        onSubmit(formData);
    };

    const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>, setValue: (v: string) => void) => {
        const digitsOnly = e.target.value.replace(/\D/g, "");

        if (!digitsOnly) {
            return;
        }

        const padded = digitsOnly.padStart(3, "0");
        const dollars = padded.slice(0, -2);
        const cents = padded.slice(-2);

        const formattedDollars = parseInt(dollars, 10).toLocaleString();

        setValue(`${formattedDollars}.${cents}`);
    };

    return (
        <>
            {item?.image && <Image src={item?.image ?? ""} alt={`${item?.name} product image`} width="100" height="150" />}
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-1">
                <div className="flex items-center">
                    <label htmlFor="upc" className="flex-[1]">UPC:</label>
                    <input id="upc" name="upc" value={formData?.upc ?? ""} onChange={handleChange} placeholder="01234567891011" className="flex-[2] border rounded-md px-2 py-1" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="name" className="flex-[1]">Item Name:</label>
                    <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Tasty Dumps" className="flex-[2] border rounded-md px-2 py-1" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="price" className="flex-[1]">Price:</label>
                    <input id="price" name="price" value={price} onChange={(e) => handleCurrencyInput(e, setPrice)} placeholder="0.00" className="flex-[2] border rounded-md px-2 py-1" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="date" className="flex-[1]">Purchase Date:</label>
                    <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} className="flex-[2] border rounded-md px-2 py-1" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="location" className="flex-[1]">Store:</label>
                    <input id="location" name="location" value={formData?.location ?? ""} onChange={handleChange} placeholder="the Dumps store" className="flex-[2] border rounded-md px-2 py-1" />
                </div>
                <div className="w-full items-center mt-2">
                    <button type="button" onClick={onCancel} className="absolute left-4 bg-white rounded-md px-2 py-1">Cancel</button>
                    <button type="submit" className="absolute right-4 bg-green-500 rounded-md px-2 py-1">Submit</button>
                </div>
            </form>
            {
                error && <p>{error}</p>
            }
        </>
    );
}