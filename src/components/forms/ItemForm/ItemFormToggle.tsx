import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    onClick: () => void;
}
export function ItemFormToggle({
    onClick
}: Props) {
    return (
        <button onClick={onClick} className="w-4/5 px-4 py-2 bg-white rounded-md">
            <FontAwesomeIcon icon={faClipboardList} /> Enter Data
        </button>
    );
}