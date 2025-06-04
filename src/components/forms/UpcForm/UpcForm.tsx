"use client";

import { Container } from "@/lib/Container";
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
        <Container>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-1">
                <div className="flex items-center">
                    <label htmlFor="upc" className="flex-[1]">UPC:</label>
                    <input id="upc" name="upc" value={upcSearchString} onChange={handleChange} placeholder="01234567891011" className="flex-[2] border rounded-md px-2 py-1" />
                </div>
                <div className="flex w-full items-center justify-between mt-2">
                    <button type="button" onClick={onCancel} className="bg-primary rounded-md px-2 py-1">Cancel</button>
                    <button type="submit" className="bg-secondaryaccent rounded-md px-2 py-1">Search</button>
                </div>
            </form>
            {
                error && <p>{error}</p>
            }
        </Container>
    );
}