import { Session } from "next-auth";
import sessionAuth from "@/lib/sessionAuth";
import { getItemsByNameSearch, getItemsByUser, getUserById } from "@/lib/prismaQueries";
import { NextResponse } from "next/server";

export const GET = sessionAuth(async (req: Request, session: Session) => {
    try {
        const userId = session.user?.id ?? -1;
        const user = await getUserById(userId);

        if (!user) return NextResponse.redirect(new URL("/auth/signin", req.url));

        const { searchParams } = new URL(req.url);
        const q: string = searchParams.get("q") ?? "";
        const items = await getItemsByNameSearch(q, user);

        return NextResponse.json({ success: true, data: items });
    } catch (err) {
        const error = err as Error;
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
});