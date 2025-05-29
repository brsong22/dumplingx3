import { Session } from "next-auth";
import { NextResponse } from "next/server";
import sessionAuth from "@/lib/sessionAuth";
import { getUserByEmail, getItemsByUser, postNewItem } from "@/lib/prismaQueries";
import { ItemForm } from "@/types/item";

export const GET = sessionAuth(async (req: Request, session: Session) => {
    try {
        const email = session.user?.email ?? "";
        const user = await getUserByEmail(email);

        if (!user) return NextResponse.redirect(new URL("/auth/signin", req.url));

        const items = await getItemsByUser(user);

        return NextResponse.json({ success: true, data: items });
    } catch (err) {
        const error = err as Error;
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
});

export const POST = sessionAuth(async (req: Request, session: Session) => {
    try {
        const email = session.user?.email ?? "";
        const user = await getUserByEmail(email);

        if (!user) return NextResponse.redirect(new URL("/auth/signin", req.url));

        const formData: ItemForm = await req.json();
        const item = await postNewItem(formData, user);

        return NextResponse.json({ success: true, insertedId: item.id }, { status: 201 });
    } catch (err) {
        const error = err as Error;
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
});