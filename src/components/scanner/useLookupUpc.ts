import { useState } from "react";
import { OpenFoodFactsBarcodeResult } from "@/types/BarcodeResult";

export function useLookupUpc() {
    const [result, setResult] = useState<OpenFoodFactsBarcodeResult | null>(null);
    const [loading, setLoading] = useState(false);

    async function searchUpc(upc: string) {
        try {
            setLoading(true);
            const res = await fetch(`/api/search?upc=${upc}`);

            if (!res.ok) throw new Error("Failed to fetch");

            const json = await res.json();
            setResult(json.item);
        } catch (e) {
            console.error(e);
            setResult(null);
        } finally {
            setLoading(false);
        }
    }

    return { result, searchUpc, loading };
}
