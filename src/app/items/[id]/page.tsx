"use client";

import { Header } from "@/components/page/Header";
import { Dumplingx3Item } from "@/types/Dumplingx3Item";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemDetailPage() {
    const params = useParams();
    const itemId = params.id;

    const [item, setItem] = useState<Dumplingx3Item>();

    useEffect(() => {
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
                item?.image &&
                <Image src={item?.image} alt={`${item?.name}-product-image`} width="80" height="100" />
            }
            <p>UPC:&nbsp;{item?.upc}</p>
            <p>Price:&nbsp;{item?.price}</p>
            <p>Store:&nbsp;{item?.location}</p>
        </div>
    );
}