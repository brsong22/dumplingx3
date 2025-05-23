"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

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
        <div style={{ maxWidth: 320, margin: "auto", padding: 20 }}>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
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
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
            <p style={{ marginTop: 12 }}>
                Don&apos;t have an account? <a href="/auth/signup">Sign Up</a>
            </p>
        </div>
    );
}
