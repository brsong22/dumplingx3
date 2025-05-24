import { OpenFoodFactsBarcodeResult } from "@/types/BarcodeResult";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const upc = searchParams.get("upc");

    if (!upc) {
        return NextResponse.json({ error: "UPC missing" }, { status: 400 });
    }

    // Simple lookup (simulate DB filter)
    const results = await fetch(`${process.env.OPENFOODFACTS_URL}/${upc}`);
    const barcodeResult = await results.json();

    const item: OpenFoodFactsBarcodeResult | null = barcodeResult.status === 1 ? {
        code: barcodeResult.code,
        name: barcodeResult.product_name_en,
        image: barcodeResult.image_front_url
    } : null;

    return NextResponse.json({ item: item });
}
