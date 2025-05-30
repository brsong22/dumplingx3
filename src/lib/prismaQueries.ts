import { User } from "@/types/user";
import { prisma } from "./prisma";
import { ItemForm } from "@/types/item";
import { Decimal } from "@prisma/client/runtime/library";

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


export async function postNewItem(itemData: ItemForm, userId: number) {
    const item = await prisma.item.create({
        data: {
            upc: itemData.upc,
            name: itemData.name,
            location: itemData.location,
            prices: {
                create: [
                    {
                        price: new Decimal(Number(itemData.price)),
                        date: new Date(itemData.date)
                    }
                ]
            },
            images: {
                create: [
                    {
                        url: itemData.image
                    }
                ]
            },
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