import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function sessionAuth(handler: (req: NextRequest, session: Session, params: any) => Promise<NextResponse>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async function (req: NextRequest, context: { params: any }) {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        return handler(req, session, context.params);
    };
}