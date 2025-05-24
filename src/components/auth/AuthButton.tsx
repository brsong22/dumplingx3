"use client";

import { useSession } from "next-auth/react";
import { SignInButton, SignOutButton } from "@/components/auth/";

export function AuthButton() {
    const { data: session, status } = useSession();


    if (status === "loading") return null;
    if (session) {
        return (
            <SignOutButton />
        );
    }

    return (
        <SignInButton />
    );
}