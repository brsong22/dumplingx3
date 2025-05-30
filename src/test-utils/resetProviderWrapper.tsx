import React from "react";
import { useReset, ResetProvider } from "@/components/AppContentResetProvider";

export function withResetProvider(component: React.ReactNode): React.ReactNode {
    return (
        <ResetProvider>
            <ResetTrigger />
            {component}
        </ResetProvider>
    );
}

const ResetTrigger = () => {
    const { reset } = useReset();
    return <button onClick={reset}>Reset State</button>;
};
