import { Session } from "next-auth";
import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import sessionAuth from "@/lib/sessionAuth";
import { getItemsByUserEmail } from "@/lib/getItems";

export const GET = sessionAuth(async (req: Request, session: Session) => {
    try {
        const db = await getMongoDb();
        const collection = db.collection("items");

        const email = session.user?.email ?? "";
        const { searchParams } = new URL(req.url);
        const upcs = searchParams.get("upc");
        let items = [];
        if (upcs) {
            items = await collection.find({
                $and: [
                    { upc: { $in: upcs } },
                    { email: email }
                ]
            }).toArray();
        } else {
            items = await getItemsByUserEmail(email);
        }
        return NextResponse.json({ success: true, data: items });

    } catch (err) {
        const error = err as Error;
        return NextResponse.json({ success: false, message: error.message });
    }
});

export const POST = sessionAuth(async (req: Request, session: Session) => {
    try {
        const db = await getMongoDb();
        const collection = db.collection("items");

        const { upc, name, price, date, location, image } = await req.json();
        const res = await collection.insertOne({ upc, name, price, date, location, image, createdBy: session.user?.email });

        return NextResponse.json({ success: true, insertedId: res.insertedId });
    } catch (err) {
        const error = err as Error;
        return NextResponse.json({ success: false, message: error.message });
    }
});