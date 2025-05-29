"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/page/Header";

export default function SignInPage() {
    const router = useRouter();
    const searchparams = useSearchParams();
    const callbackParam = searchparams.get("callbackUrl");

    let callbackUrl = callbackParam || "/";
    if (callbackUrl === "/auth/signup") {
        callbackUrl = "/";
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl,
        });

        setLoading(false);

        if (result?.error) {
            setError("Invalid email or password");
            return;
        }

        if (result?.ok) {
            router.push(callbackUrl);
        }
    }

    return (
        <div className="flex-col w-full h-screen bg-primary justify-center m-auto">
            <Header />
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto p-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", marginBottom: 12, padding: 8 }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", marginBottom: 12, padding: 8 }}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                    type="submit"
                    style={{ width: "100%", padding: 10 }}
                    disabled={loading}
                    className="bg-secondary border-2 border-accentdark font-semibold rounded-md"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
            <p className="w-1/2 p-4 mx-auto">
                Don&apos;t have an account? <a href="/auth/signup" className="underline hover:text-secondary">Sign Up</a>
            </p>
        </div>
    );
}
