import { OpenFoodFactsBarcodeResult } from "@/types/BarcodeResult";
import Image from "next/image";

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
            {result ?
                <>
                    <div className="text-white"><p className="">{result.name}</p></div>
                    <Image src={result.image} alt={`${result.name} product image`} width={400} height={600} />
                </>
                : <p>No results found.</p>
            }
        </div>
    );
}
