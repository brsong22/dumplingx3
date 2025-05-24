"use client";

import { signIn } from "next-auth/react";

export function SignInButton() {
    return (
        <button onClick={() => signIn()} className="absolute right-0 mr-4">
            Sign In
        </button>
    );
}