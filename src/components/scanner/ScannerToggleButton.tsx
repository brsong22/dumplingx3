import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    onClick: () => void
}
export function ScannerToggleButton({ onClick }: Props) {
    return (
        <button onClick={onClick}>
            <FontAwesomeIcon icon={faCamera} /> Scan Barcode
        </button>
    );
}
