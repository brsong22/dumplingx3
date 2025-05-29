"use client";
import { BarcodeScannerToggle } from "@/components/scanner/BarcodeScannerToggle";
import { ItemFormToggle } from "@/components/forms/ItemForm/ItemFormToggle";
import { useEffect, useState } from "react";
import { BarcodeScanner, useLookupUpc } from "../scanner";
import { ItemForm } from "../forms/ItemForm/ItemForm";
import { Item } from "@/types/item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons/faBasketShopping";
// import { faWallet } from "@fortawesome/free-solid-svg-icons/faWallet";
import { useRouter } from "next/navigation";

export function AppContent({ }) {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [userItems, setUserItems] = useState<Item[]>([]);

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

    return (
        <div className="flex-1 p-4">
            {(!isScanning && !showForm) && (
                <>
                    <div className="flex flex-col gap-y-2 justify-center items-center">
                        <BarcodeScannerToggle onClick={() => setIsScanning(true)} />
                        <ItemFormToggle onClick={() => setShowForm(true)} />
                    </div>
                    <div className="flex-col space-y-1 mt-2">
                        {userItems.map((item) => (
                            <button type="button" key={`${item.id}${item.name}-list-item`} onClick={() => handleNavigateToItem(item.id)} className="flex items-center justify-between w-full h-15 px-4 py-2 bg-secondary border border-secondary rounded-md">
                                <span><FontAwesomeIcon icon={faBasketShopping} />&nbsp;{item.name}</span>
                                {/* <span><FontAwesomeIcon icon={faWallet} className="ml-2" />&nbsp;{item.price}</span> */}
                            </button>
                        ))}
                    </div>
                </>
            )}
            {isScanning && <BarcodeScanner onDetected={handleDetected} onCancel={handleCancel} />}
            {showForm && <ItemForm item={itemInfo} onCancel={handleCancel} />}
        </div>
    );
}