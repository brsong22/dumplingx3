"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: "/auth/signin" })} className="absolute right-0 mr-4 bg-primarybg border border-secondaryaccent font-semibold px-2 py-1 rounded-md">
            Sign Out
        </button>
    );
}