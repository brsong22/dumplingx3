import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { AppContent } from "../components/page/AppContent";
import { Header } from "@/components/page/Header";
import { ResetProvider } from "@/components/AppContentResetProvider";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <AppContent />
    );
}
