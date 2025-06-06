import { User } from "@/types/user";
import { prisma } from "./prisma";
import { ItemForm } from "@/types/item";
import { Decimal } from "@prisma/client/runtime/library";

export async function getUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return user;
}

export async function getItemsByUser(userId: number, limit: number = 10) {
    const userItems = await prisma.item.findMany({
        where: {
            userId
        },
        include: {
            images: true,
            prices: true
        },
        take: limit
    });

    return userItems;
}

export async function getItemById(userId: number, itemId: number) {
    const userItem = await prisma.item.findUnique({
        where: {
            id: itemId,
            userId
        },
        include: {
            location: true,
            images: true,
            prices: true
        }
    });

    if (!userItem) return null;

    const item = {
        ...userItem,
        prices: userItem?.prices.map((price) => ({ ...price, price: Number(price.price) }))
    };

    return item;
}

export async function getItemsByNameSearch(nameQuery: string, user: User) {
    const matches = await prisma.item.findMany({
        where: {
            user,
            name: {
                contains: nameQuery,
                mode: "insensitive"
            }
        },
        include: {
            images: true,
            prices: true,
            location: true
        }
    });

    const withPricesAsNumber = matches.map((item) => ({
        ...item,
        prices: item.prices.map((price) => ({
            ...price,
            price: price.price.toNumber()
        }))
    }));

    return withPricesAsNumber;
}

export async function postNewItem(itemData: ItemForm, userId: number) {
    let location = null;
    if (itemData.location) {
        location = await getLocationByName(itemData.location);

        if (!location) {
            location = await postNewLocation(itemData.location);
        }
    }
    const item = await prisma.item.create({
        data: {
            upc: itemData.upc,
            name: itemData.name,
            location: location ? { connect: { id: location.id } } : undefined,
            prices: {
                create: [
                    {
                        price: new Decimal(Number(itemData.price)),
                        date: new Date(itemData.date)
                    }
                ]
            },
            images: itemData.image ? {
                create: [
                    {
                        url: itemData.image
                    }
                ]
            } : undefined,
            user: {
                connect: { id: userId }
            }
        },
        include: {
            prices: true,
            images: true
        }
    });

    return item;
}

export async function getLocationById(id: number) {
    const location = await prisma.location.findUnique({
        where: { id },
        include: { items: true }
    });

    return location;
}
export async function getLocationByName(name: string) {
    const location = await prisma.location.findFirst({
        where: { name },
        include: { items: true }
    });

    return location;
}

export async function postNewLocation(name: string, address?: string) {
    const location = await prisma.location.create({
        data: {
            name,
            address
        }
    });

    return location;
}