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
    const userItem = await prisma.item.findFirst({
        where: {
            id: itemId,
            userId
        },
        include: {
            images: true,
            prices: {
                include: {
                    location: true
                }
            }
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
            prices: {
                include: {
                    location: true
                }
            }
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
    const item = await prisma.item.create({
        data: {
            upc: itemData.upc,
            name: itemData.name,
            prices: {
                create: {
                    location: itemData.locationId
                        ? { connect: { id: itemData.locationId } }
                        : {
                            create: {
                                name: itemData.location,
                                user: { connect: { id: userId } }
                            }
                        },
                    price: new Decimal(Number(itemData.price)),
                    date: new Date(itemData.date),
                    user: { connect: { id: userId } }
                }
            },
            images: itemData.image ? {
                create: [
                    {
                        url: itemData.image,
                        user: { connect: { id: userId } }
                    }
                ]
            } : undefined,
            user: {
                connect: { id: userId }
            }
        },
        include: {
            prices: {
                include: {
                    location: true
                }
            },
            images: true
        }
    });

    return item;
}

export async function getPriceRecordsByItemId(itemId: number, user: User) {
    const priceRecords = await prisma.priceRecord.findMany({
        where: {
            itemId,
            user
        },
        include: {
            item: true,
            location: true
        },
        orderBy: {
            date: "asc"
        }
    });

    return priceRecords;
}

export async function getLocationsByNameSearch(nameQuery: string, user: User) {
    const matches = await prisma.location.findMany({
        where: {
            user,
            name: {
                contains: nameQuery,
                mode: "insensitive"
            }
        }
    });

    return matches;
}

export async function getPriceRecordsByLocationId(locationId: number, user: User) {
    const priceRecords = await prisma.priceRecord.findMany({
        where: {
            locationId,
            user
        },
        include: {
            item: true,
            location: true
        },
        orderBy: {
            date: "asc"
        }
    });

    return priceRecords;
}

export async function postPriceRecord(formData: ItemForm, userId: number) {
    if (!formData.id) return null;
    const priceRecord = await prisma.priceRecord.create({
        data: {
            item: { connect: { id: formData.id } },
            location: formData.locationId
                ? { connect: { id: formData.locationId } }
                : { create: { name: formData.location, user: { connect: { id: userId } } } },
            price: formData.price,
            date: new Date(formData.date),
            user: { connect: { id: userId } }
        },
        include: {
            item: {
                include: {
                    prices: true,
                    images: true
                }
            }
        }
    });

    return priceRecord.item;
}

export async function getLocationsByItemId(itemId: number, user: User) {
    const itemPriceRecords = await prisma.priceRecord.findMany({
        where: {
            itemId,
            user
        },
        distinct: ["locationId"],
        include: {
            location: true
        }
    });

    const locations = itemPriceRecords.map((record) => (record.location));

    return locations;
}

export async function getLocationById(id: number, user: User) {
    const location = await prisma.location.findUnique({
        where: {
            id,
            user
        },
    });

    return location;
}
