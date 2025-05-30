"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Item } from "@/types/item";
import { Header } from "@/components/page/Header";

export default function ItemDetailPage() {
    const params = useParams();
    const itemId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id ?? '', 10);

    const [item, setItem] = useState<Item | null>();

    useEffect(() => {
        if (!itemId) {
            setItem(null);
        }

        const fetchItemInfo = async () => {
            const res = await fetch(`/api/items/${itemId}`);
            const itemInfo = await res.json();

            setItem(itemInfo.data);
        };

        fetchItemInfo();
    }, [itemId]);

    console.log(item);
    return (
        <div>
            <Header />
            <h2 className="font-bold text-2xl">{item?.name}</h2>
            {
                item &&
                <>
                    {
                        item.images.length > 0 &&
                        item.images.map((image, index) => {
                            return <Image src={image.url} alt={`${item.name}-product-image-${index}`} width="80" height="100" />
                        })
                    }
                    <p>Name:&nbsp;{item.name}</p>
                    <p>Latest Price:&nbsp;{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.prices[0].price)}</p>
                    <p>UPC:&nbsp;{item.upc}</p>
                    <p>Store:&nbsp;{item.location}</p>
                    <p>Price History:</p>
                    {
                        item.prices.map((price) => {
                            return <p>{new Date(price.date).toISOString().split("T")[0]}: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price.price)}</p>
                        })
                    }
                </>
            }

        </div>
    );
}