"use client";
import { BarcodeScannerToggle } from "@/components/scanner/BarcodeScannerToggle";
import { ItemFormToggle } from "@/components/forms/ItemForm/ItemFormToggle";
import { useState } from "react";
import { BarcodeScanner, useLookupUpc } from "../scanner";
import { ItemForm } from "../forms/ItemForm/ItemForm";

export function AppContent({ }) {

    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);

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

    return (
        <div className="flex-1 p-4">
            {(!isScanning && !showForm) && (
                <div className="flex flex-col gap-y-2 justify-center items-center">
                    <BarcodeScannerToggle onClick={() => setIsScanning(true)} />
                    <ItemFormToggle onClick={() => setShowForm(true)} />
                </div>
            )}
            {isScanning && <BarcodeScanner onDetected={handleDetected} onCancel={handleCancel} />}
            {showForm && <ItemForm item={itemInfo} onCancel={handleCancel} />}
        </div>
    );
}