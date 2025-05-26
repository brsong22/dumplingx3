import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export default function sessionAuth(handler: (req: NextRequest, session: Session) => Promise<NextResponse>) {
    return async function (req: NextRequest) {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        return handler(req, session);
    };
}