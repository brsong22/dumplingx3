"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

function AuthGate({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    if (status === "loading") return <div>Loading...</div>;

    return <>{children}</>;
}
export function SessionProviderWrapper({ children }: { children: ReactNode }) {
    return <SessionProvider>
        <AuthGate>{children}</AuthGate>
    </SessionProvider>;
}