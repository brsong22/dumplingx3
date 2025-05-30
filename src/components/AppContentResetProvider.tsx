"use client";

import React, { createContext, useContext, useState } from "react";

const ResetContext = createContext<{ reset: () => void; resetFlag: boolean }>({
    reset: () => { },
    resetFlag: false,
});

export const ResetProvider = ({ children }: { children: React.ReactNode }) => {
    const [resetFlag, setResetFlag] = useState<boolean>(false);

    const reset = () => {
        setResetFlag((prev) => !prev);
    };

    return (
        <ResetContext.Provider value={{ reset, resetFlag }}>
            {children}
        </ResetContext.Provider>
    );
};

export const useReset = () => useContext(ResetContext);
