import { AuthButton } from "../auth/AuthButton";
import { HeaderLink } from "./HeaderLink";

export function Header() {
    return (
        <div className="flex items-center justify-between w-full h-20 bg-accentdark text-primarytext px-4">
            <HeaderLink route="/" />
            <AuthButton />
        </div>
    );
}