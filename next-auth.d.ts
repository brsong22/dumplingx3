import NextAuth from "next-auth";
import { User as PrismaUser } from "@/types/user";

type SessionUser = Omit<PrismaUser, "password">;

declare module "next-auth" {
    interface Session {
        user: SessionUser;
    }

    interface User extends PrismaUser { }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }
}
