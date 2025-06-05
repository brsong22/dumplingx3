export interface ItemImage {
    id: number,
    itemId: number,
    url: string
    createdAt: Date,
    updatedAt: Date
}

export interface ItemPrice {
    id: number,
    itemId: number,
    price: number,
    date: Date,
    createdAt: Date,
    updatedAt: Date
}

export interface Item {
    id: number,
    upc?: string | null,
    name: string,
    brand?: string | null,
    location?: Location | null,
    images?: ItemImage[],
    userId: number,
    prices: ItemPrice[],
    createdAt: Date,
    updatedAt: Date
}

export interface ItemForm {
    id: number,
    upc: string | null,
    name: string,
    location: string | null,
    image: string | null,
    price: string,
    date: string
}

export interface Location {
    id: number,
    name: string,
    address?: string | null,
    items?: Item[]
}