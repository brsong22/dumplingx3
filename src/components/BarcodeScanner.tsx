"use client";

import { useState } from "react";
import { BarcodeScanner as Scanner, BarcodeScannerResult, ScannerToggleButton, useLookupUpc } from "./scanner/";

export default function BarcodeScanner() {
    const [scanning, setScanning] = useState(false);
    const [upc, setUpc] = useState("");
    const { result, searchUpc } = useLookupUpc();

    function handleDetected(code: string) {
        setUpc(code);
        setScanning(false);
        searchUpc(code);
    }

    return (
        <div>
            {!scanning && <ScannerToggleButton onClick={() => setScanning(true)} />}
            {scanning && <Scanner onDetected={handleDetected} onCancel={() => setScanning(false)} />}
            <BarcodeScannerResult upc={upc} result={result} />
        </div>
    );
}
