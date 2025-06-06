"use client";

import { getLocalISODateTime } from "@/lib/datetimeutils";
import { OpenFoodFactsBarcodeResult } from "@/types/BarcodeResult";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ItemForm as Form, Item, Location } from "@/types/item";
import { Container } from "@/lib/Container";
import { debounce } from "@/lib/debounce";

interface Props {
    item: OpenFoodFactsBarcodeResult | null;
    onSubmit: (data: Form) => void;
    onCancel: () => void;
    error: string | null;
}

async function itemByNameSuggestions(query: string): Promise<Item[]> {
    const params = new URLSearchParams({ q: query });
    const res = await fetch(`/api/items/search?${params.toString()}`);
    const { data: nameMatches } = await res.json();

    return nameMatches;
}

async function locationByNameSuggestions(query: string): Promise<Location[]> {
    const params = new URLSearchParams({ q: query });
    const res = await fetch(`/api/locations/search?${params.toString()}`);
    const { data: locationMatches } = await res.json();

    return locationMatches;
}

export function ItemForm({
    item,
    onSubmit,
    onCancel,
    error
}: Props) {
    const [formData, setFormData] = useState<Form>({
        id: item?.id ?? null,
        upc: item?.code ?? "",
        name: item?.name ?? "",
        price: "0.00",
        date: getLocalISODateTime(new Date()).split("T")[0],
        location: "",
        locationId: null,
        image: null
    });
    const [price, setPrice] = useState<string>("0.00");
    const [nameMatches, setItemNameMatches] = useState<Item[]>([]);
    const [nameIsFocused, setNameIsFocused] = useState<boolean>(false);
    const [locationMatches, setLocationMatches] = useState<Location[]>([]);
    const [locationIsFocused, setLocationIsFocused] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        formData.price = price;
        formData.image = item?.image ?? "";

        onSubmit(formData);
    };

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setFormData({
            ...formData,
            id: null,
            name: searchName
        });
        debouncedItemNameMatches(searchName);
    };

    const handleNameSuggestion = async (e: React.MouseEvent<HTMLLIElement>, item: Item) => {
        setFormData({
            ...formData,
            id: item.id,
            name: item.name,
            upc: item.upc ?? null,
            price: "0.00",
            image: null
        });
        setItemNameMatches([]);
    }

    const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setFormData({
            ...formData,
            locationId: null,
            location: searchName
        });
        debouncedLocationMatches(searchName);
    };

    const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digitsOnly = e.target.value.replace(/\D/g, "");

        if (!digitsOnly) {
            return;
        }

        const padded = digitsOnly.padStart(3, "0");
        const dollars = padded.slice(0, -2);
        const cents = padded.slice(-2);

        const formattedDollars = parseInt(dollars, 10).toLocaleString();

        setPrice(`${formattedDollars}.${cents}`);
    };

    const debouncedItemNameMatches = useCallback(debounce(async (query: string) => {
        const nameMatches = await itemByNameSuggestions(query);
        setItemNameMatches(nameMatches);
    }, 100), []);

    const debouncedLocationMatches = useCallback(debounce(async (query: string) => {
        const locationMatches = await locationByNameSuggestions(query);
        setLocationMatches(locationMatches ?? []);
    }, 100), []);

    const filteredLocations = useMemo(() => {
        if (!formData.location) return locationMatches;
        return locationMatches.filter((loc) =>
            loc.name.toLowerCase().includes(formData.location.toLowerCase())
        );
    }, [formData.location, locationMatches]);

    useEffect(() => {
        debouncedItemNameMatches("");
    }, []);

    useEffect(() => {
        debouncedLocationMatches("");
    }, []);

    return (
        <Container>
            {item?.image && <Image src={item?.image ?? ""} alt={`${item?.name} product image`} width="100" height="150" />}
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-1">
                <div className="flex items-center">
                    <label htmlFor="upc" className="flex-1">UPC:</label>
                    <div className="flex-[2] relative">
                        <input id="upc" name="upc" value={formData?.upc ?? ""} disabled={formData.id ? true : false} onChange={handleChange} placeholder="01234567891011" className="w-full border rounded-md px-2 py-1" />
                    </div>
                </div>
                <div className="flex items-center">
                    <label htmlFor="name" className="flex-1">Name*:</label>
                    <div className="flex-[2] relative">
                        <input id="name" name="name" value={formData.name} required={true} onChange={handleNameInput} onFocus={() => setNameIsFocused(true)} onBlur={() => setNameIsFocused(false)} placeholder="Tasty Dumps" autoComplete="off" className="w-full border rounded-md px-2 py-1" />
                        {(nameIsFocused && nameMatches.length > 0) && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                {nameMatches.map((item) => (
                                    <li
                                        key={item.id}
                                        onMouseDown={(e) => handleNameSuggestion(e, item)}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    <label htmlFor="price" className="flex-1">Price:</label>
                    <div className="flex-[2] relative">
                        <input id="price" name="price" value={price} onChange={handleCurrencyInput} placeholder="0.00" className="w-full border rounded-md px-2 py-1" />
                    </div>
                </div>
                <div className="flex items-center">
                    <label htmlFor="location" className="flex-1">Store*:</label>
                    <div className="flex-[2] relative">
                        <input id="location" name="location" value={formData?.location ?? ""} required={true} onChange={handleLocationInput} onFocus={() => setLocationIsFocused(true)} onBlur={() => setLocationIsFocused(false)} placeholder="the Dumps store" autoComplete="off" className="w-full border rounded-md px-2 py-1" />
                        {(locationIsFocused && filteredLocations.length > 0) && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                {filteredLocations.map((location) => (
                                    <li
                                        key={location.id}
                                        onMouseDown={() => {
                                            setFormData({
                                                ...formData,
                                                locationId: location.id,
                                                location: location.name
                                            });
                                            setLocationMatches([]);
                                        }}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {location.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    <label htmlFor="date" className="flex-1">Purchased:</label>
                    <div className="flex-[2] relative">
                        <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} className="w-full border rounded-md px-2 py-1" />
                    </div>
                </div>
                <div className="flex w-full items-center justify-between mt-2">
                    <button type="button" onClick={onCancel} className="bg-primary rounded-md px-2 py-1">Cancel</button>
                    <button type="submit" className="bg-secondaryaccent rounded-md px-2 py-1">Submit</button>
                </div>
            </form>
            {
                error && <p>{error}</p>
            }
        </Container >
    );
}