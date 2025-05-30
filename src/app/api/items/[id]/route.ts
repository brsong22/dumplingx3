import { Session } from "next-auth";
import { NextResponse } from "next/server";
import sessionAuth from "@/lib/sessionAuth";
import { getItemById, getUserByEmail } from "@/lib/prismaQueries";
import { User } from "@/types/user";
import { Item } from "@/types/item";

export const GET = sessionAuth(async (req: Request, session: Session, params: { id: string }) => {
    try {
        const itemId = (await params).id;

        const email = session.user?.email ?? "";
        const user: User | null = await getUserByEmail(email);

        if (!user) return NextResponse.redirect(new URL("/auth/signin", req.url));

        const item: Item | null = await getItemById(user.id, parseInt(itemId, 10));

        if (!item) return NextResponse.json({ success: false, message: "Item not found." }, { status: 404 });

        return NextResponse.json({ success: true, data: item });

    } catch (err) {
        const error = err as Error;
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
});