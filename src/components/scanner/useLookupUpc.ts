import { useState } from "react";
import { OpenFoodFactsBarcodeResult } from "@/types/BarcodeResult";

export function useLookupUpc() {
    const [itemInfo, setItemInfo] = useState<OpenFoodFactsBarcodeResult | null>(null);
    const [loading, setLoading] = useState(false);

    const searchUpc = async (upc: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/search?upc=${upc}`);

            if (!res.ok) throw new Error("Failed to fetch");

            const json = await res.json();
            setItemInfo(json.item);
        } catch (e) {
            console.error(e);
            setItemInfo(null);
        } finally {
            setLoading(false);
        }
    };

    const resetItemInfo = () => {
        setItemInfo(null);
    };

    return { itemInfo, searchUpc, resetItemInfo, loading };
}
