import { AuthButton } from "../auth/AuthButton";

export function Header() {
    return (
        <div className="flex items-center justify-between w-full h-20 bg-accentdark text-primarytext px-4">
            <div className="flex text-4xl">Dumplingx3!</div>
            <AuthButton />
        </div>
    );
}