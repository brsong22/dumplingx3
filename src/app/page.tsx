import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AppContent } from "../components/page/AppContent";
import { Header } from "@/components/page/Header";
import { getItemsByUserEmail } from "@/lib/getItems";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    const userItems = await getItemsByUserEmail(session.user?.email ?? "");
    console.log(userItems);

    return (
        <div className="flex flex-col w-full h-screen">
            <Header />
            <main className="flex-1 w-full h-full bg-dumplingprimary">
                <AppContent />
            </main>
        </div>
    );
}
