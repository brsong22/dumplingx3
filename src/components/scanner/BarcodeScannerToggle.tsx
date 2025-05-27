import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    onClick: () => void;
}
export function BarcodeScannerToggle({ onClick }: Props) {
    return (
        <button onClick={onClick} className="w-4/5 px-4 py-2 bg-white rounded-md">
            <FontAwesomeIcon icon={faCamera} data-testid="barcodeScannerToggleCameraIcon" /> Scan Barcode
        </button>
    );
}
