import { Session } from "next-auth";
import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import sessionAuth from "@/lib/sessionAuth";

export const GET = sessionAuth(async (req: Request, session: Session, params: { id: string }) => {
    try {
        const id = (await params).id;

        const db = await getMongoDb();
        const collection = db.collection("items");

        const email = session.user?.email ?? "";

        console.log(id);
        console.log(email);

        const item = await collection.findOne({
            id: parseInt(id, 10),
            createdBy: email
        });

        return NextResponse.json({ success: true, data: item });

    } catch (err) {
        const error = err as Error;
        return NextResponse.json({ success: false, message: error.message });
    }
});