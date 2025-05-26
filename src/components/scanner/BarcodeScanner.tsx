import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

interface Props {
    onDetected: (code: string) => void;
    onCancel: () => void;
}
export function BarcodeScanner({
    onDetected,
    onCancel,
}: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        // Simulate a delay for camera initialization
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust the delay as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <button onClick={onCancel}><FontAwesomeIcon icon={faXmark} /></button>
            {loading && <p>Loading...</p>}
            <BarcodeScannerComponent
                width={400}
                height={300}
                onUpdate={(err, result) => {
                    if (result) {
                        onDetected(result.getText());
                    }
                }}
            />
        </>
    );
}
