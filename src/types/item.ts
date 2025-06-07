export interface Item {
    id: number,
    upc?: string | null,
    name: string,
    brand?: string | null,
    location?: Location | null,
    images?: ItemImage[],
    userId: number,
    prices: PriceRecord[],
    createdAt: Date,
    updatedAt: Date
}

export interface ItemImage {
    id: number,
    itemId: number,
    url: string
    createdAt: Date,
    updatedAt: Date
}

export interface Location {
    id: number,
    name: string,
    address?: string | null,
    prices: PriceRecord[],
    createdAt: Date,
    updatedAt: Date
}

export interface PriceRecord {
    id: number,
    item: Item,
    location: Location,
    price: number,
    note: string,
    date: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface ItemForm {
    id: number | null,
    upc: string | null,
    name: string,
    location: string,
    locationId: number | null,
    image: string | null,
    price: string,
    date: string
}