"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: "/auth/signin" })} className="absolute right-0 mr-4 bg-accent font-semibold px-2 py-1 border-2 border-accentdark rounded-md">
            Sign Out
        </button>
    );
}