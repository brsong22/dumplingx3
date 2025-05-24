import BarcodeScannerComponent from "react-qr-barcode-scanner";

export function BarcodeScanner({
    onDetected,
    onCancel,
}: {
    onDetected: (code: string) => void;
    onCancel: () => void;
}) {
    return (
        <>
            <button onClick={onCancel}>Cancel</button>
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
