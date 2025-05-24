import { OpenFoodFactsBarcodeResult } from "@/types/BarcodeResult";

export function BarcodeScannerResult({
    upc,
    result,
}: {
    upc: string;
    result: OpenFoodFactsBarcodeResult | null;
}) {
    return (
        <div>
            <h2>Scanned UPC: {upc}</h2>
            <h3>Search results:</h3>
            {result ? <p>{result.name}</p> : <p>No results found.</p>}
        </div>
    );
}
