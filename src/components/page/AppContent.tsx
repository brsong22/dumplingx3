"use client";
import { BarcodeScannerToggle } from "@/components/scanner/BarcodeScannerToggle";
import { ItemFormToggle } from "@/components/forms/ItemForm/ItemFormToggle";
import { useEffect, useState } from "react";
import { BarcodeScanner, useLookupUpc } from "../scanner";
import { ItemForm } from "../forms/ItemForm/ItemForm";
import { OpenFoodFactsBarcodeResult } from "@/types/BarcodeResult";

export function AppContent({ }) {
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [userItems, setUserItems] = useState<OpenFoodFactsBarcodeResult[]>([]);

    const { itemInfo, searchUpc, resetItemInfo } = useLookupUpc();

    async function handleDetected(code: string) {
        setIsScanning(false);
        await searchUpc(code);
        setShowForm(true);
    };

    const handleCancel = () => {
        setIsScanning(false);
        setShowForm(false);
        resetItemInfo();
    };

    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch("/api/items", {
                method: "GET"
            });

            const items = await res.json();

            setUserItems(items.data);
        };

        fetchItems();
    }, [isScanning, showForm]);

    console.log(userItems);

    return (
        <div className="flex-1 p-4">
            {(!isScanning && !showForm) && (
                <>
                    <div className="flex flex-col gap-y-2 justify-center items-center">
                        <BarcodeScannerToggle onClick={() => setIsScanning(true)} />
                        <ItemFormToggle onClick={() => setShowForm(true)} />
                    </div>
                    <div>
                        {userItems.map((item, index) => (
                            <div key={`${item.name}-list-item-${index}`}>{item.name}</div>
                        ))}
                    </div>
                </>
            )}
            {isScanning && <BarcodeScanner onDetected={handleDetected} onCancel={handleCancel} />}
            {showForm && <ItemForm item={itemInfo} onCancel={handleCancel} />}
        </div>
    );
}