import type { Metadata } from "next";
import "./globals.css";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ResetProvider } from "@/components/AppContentResetProvider";
import { Header } from "@/components/page/Header";

config.autoAddCss = false;

export const metadata: Metadata = {
    title: "Dumplingx3",
    description: "Track the prices of your favorite groceries",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiase">
                <SessionProviderWrapper>
                    <ResetProvider>
                        <Header />
                        <main className="flex justify-center w-full h-screen p-4 bg-primarybg">{children}</main>
                    </ResetProvider>
                </SessionProviderWrapper>
            </body>
        </html>
    );
}
