import Link from "next/link";
import { AuthButton } from "../auth/AuthButton";

export function Header() {
    return (
        <div className="flex items-center w-full h-10 bg-white text-black px-4">
            <Link href="">Dumplingx3!</Link>
            <AuthButton />
        </div>
    );
}