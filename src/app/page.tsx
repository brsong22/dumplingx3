import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AppContent } from "../components/page/AppContent";
import { Header } from "@/components/page/Header";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="flex flex-col w-full h-screen">
            <Header />
            <main className="flex-1 w-full h-full bg-primary">
                <AppContent />
            </main>
        </div>
    );
}
