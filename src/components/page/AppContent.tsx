"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarcodeScannerToggle, BarcodeScanner, useLookupUpc } from "../scanner";
import { UpcFormToggle, UpcForm } from "@/components/forms/UpcForm";
import { ItemFormToggle, ItemForm } from "@/components/forms/ItemForm";
import { ItemForm as Form } from "@/types/item";
import { Item } from "@/types/item";
import { useReset } from "../AppContentResetProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons/faBasketShopping";
import { Container } from "@/lib/Container";

export function AppContent() {
    const router = useRouter();
    const { reset, resetFlag } = useReset();
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [showUpcForm, setShowUpcForm] = useState<boolean>(false);
    const [upcSearchError, setUpcSearchError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [itemFormError, setItemFormError] = useState<string | null>(null);
    const [userItems, setUserItems] = useState<Item[]>([]);

    const { itemInfo, searchUpc, resetItemInfo } = useLookupUpc();

    const handleDetected = async (code: string) => {
        setIsScanning(false);
        await searchUpc(code);
        setShowForm(true);
    };

    const handleUpcSearchSubmit = async (code: string) => {
        const item = await searchUpc(code);

        if (item) {
            setUpcSearchError(null);
            setShowUpcForm(false);
            setShowForm(true);
        } else {
            setUpcSearchError("Unable to find item.");
        }
    };

    const handleItemFormSubmit = async (data: Form) => {
        const res = await fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (result.success) {
            reset();
        } else {
            setItemFormError("Error saving item.");
        }
    };

    const handleCancel = () => {
        reset();
    };

    const handleNavigateToItem = (id: number) => {
        if (id) {
            router.push(`/items/${id}`);
        }
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

    useEffect(() => {
        setIsScanning(false);
        setShowUpcForm(false);
        setUpcSearchError(null);
        setShowForm(false);
        resetItemInfo();
    }, [resetFlag, resetItemInfo]);

    return (
        <Container>
            {(!isScanning && !showUpcForm && !showForm) && (
                <>
                    <div className="flex flex-col gap-y-2 justify-center items-center">
                        <BarcodeScannerToggle onClick={() => setIsScanning(true)} />
                        <UpcFormToggle onClick={() => setShowUpcForm(true)} />
                        <ItemFormToggle onClick={() => setShowForm(true)} />
                        <div className="flex flex-col justify-center w-full items-center space-y-1 mt-2">
                            {userItems.map((item) => (
                                <button type="button" key={`${item.id}${item.name}-list-item`} onClick={() => handleNavigateToItem(item.id)} className="flex items-center justify-between w-4/5 h-15 px-4 py-2 bg-primary rounded-md">
                                    <span><FontAwesomeIcon icon={faBasketShopping} />&nbsp;{item.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
            {isScanning && <BarcodeScanner onDetected={handleDetected} onCancel={handleCancel} />}
            {showUpcForm && <UpcForm onSubmit={handleUpcSearchSubmit} onCancel={handleCancel} error={upcSearchError} />}
            {showForm && <ItemForm item={itemInfo} onSubmit={handleItemFormSubmit} onCancel={handleCancel} error={itemFormError} />}
        </Container>
    );
}