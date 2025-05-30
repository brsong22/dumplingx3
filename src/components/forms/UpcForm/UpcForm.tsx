"use client";

import { useState } from "react";

interface Props {
    onSubmit: (code: string) => void;
    onCancel: () => void;
    error: string | null
}
export function UpcForm({
    onSubmit,
    onCancel,
    error
}: Props) {
    const [upcSearchString, setUpcSearchString] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpcSearchString(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(upcSearchString);
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-1">
                <div className="flex items-center">
                    <label htmlFor="upc" className="flex-[1]">UPC:</label>
                    <input id="upc" name="upc" value={upcSearchString} onChange={handleChange} placeholder="01234567891011" className="flex-[2] border rounded-md px-2 py-1" />
                </div>
                <div className="w-full items-center mt-2">
                    <button type="button" onClick={onCancel} className="absolute left-4 bg-white rounded-md px-2 py-1">Cancel</button>
                    <button type="submit" className="absolute right-4 bg-green-500 rounded-md px-2 py-1">Search</button>
                </div>
            </form>
            {
                error && <p>{error}</p>
            }
        </>
    );
}