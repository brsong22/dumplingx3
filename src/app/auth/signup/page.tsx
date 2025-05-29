"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/page/Header";

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

        // On success, redirect to sign-in page
        router.push("/auth/signin");
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
                <button type="submit" className="bg-secondary border-2 border-accentdark font-semibold rounded-md px-2 py-1">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
