import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
export function Container({ children }: Props) {
    return (
        <div className="flex flex-col w-full h-screen bg-primarybg items-center">
            <div className="w-full h-full md:w-2/3">
                {children}
            </div>
        </div>
    );
}