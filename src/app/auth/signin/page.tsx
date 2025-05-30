"use client";

import { Suspense } from "react";
import SignInPageContent from "@/components/auth/SignInPageContent";

export default function SignInPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInPageContent />
        </Suspense>
    );
}
