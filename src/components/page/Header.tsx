import Link from "next/link";
import { AuthButton } from "../auth/AuthButton";

export function Header() {
    return (
        <div className="sticky top-0 z-1000 flex items-center w-full h-10 bg-white text-black p-4">
            <Link href="/">Dumplingx3!</Link>
            <AuthButton />
        </div>
    );
}