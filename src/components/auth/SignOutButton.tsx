"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: "/auth/signin" })} className="absolute right-0 mr-4">
            Sign out
        </button>
    );
}