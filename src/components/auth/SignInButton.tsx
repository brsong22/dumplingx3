"use client";

import { signIn } from "next-auth/react";

export function SignInButton() {
    return (
        <button onClick={() => signIn()} className="absolute right-0 mr-4 bg-secondary border-2 border-accentdark font-semibold rounded-md px-2 py-1">
            Sign In
        </button>
    );
}