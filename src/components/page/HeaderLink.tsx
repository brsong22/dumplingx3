"use client";

import Link from "next/link";
import { useReset } from "../AppContentResetProvider";

interface Props {
    route: string
};
export function HeaderLink({ route }: Props) {
    const { reset } = useReset();

    return (
        <Link href={route} className="flex text-4xl"><span onClick={reset}>Dumplingx3!</span></Link>
    );
}