"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/lib/Container";

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Something went wrong");
            return;
        }

        router.push("/auth/signin");
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" className="bg-secondary border border-secondaryaccent font-semibold rounded-md px-2 py-1">
                    Sign Up
                </button>
            </form>
        </Container>
    );
}
