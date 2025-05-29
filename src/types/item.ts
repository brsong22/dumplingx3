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
    createdAt: Date,
    updatedAt: Date
}

export interface Item {
    id: number,
    upc: string | null,
    name: string,
    brand: string | null,
    location: string | null,
    images: ItemImage[],
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
    // images: ItemImage[],
    price: string,
    date: string
}