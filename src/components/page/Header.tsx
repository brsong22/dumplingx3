import { AuthButton } from "../auth/AuthButton";
import { HeaderLink } from "./HeaderLink";

export function Header() {
    return (
        <div className="flex items-center md:justify-center justify-between w-full h-20 bg-secondary text-primarytext px-4">
            <div className="flex justify-between relative md:w-2/3 md:mx-auto w-full px-4">
                <HeaderLink route="/" />
                <AuthButton />
            </div>
        </div>
    );
}