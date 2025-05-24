import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/page/Header";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";
import { config } from "@fortawesome/fontawesome-svg-core";

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
            <body className="antialiased bg-dumplingprimary text-black">
                <SessionProviderWrapper>
                    <Header />
                    {children}
                </SessionProviderWrapper>
            </body>
        </html>
    );
}
