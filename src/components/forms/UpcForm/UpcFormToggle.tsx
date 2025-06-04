import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    onClick: () => void;
}
export function UpcFormToggle({
    onClick
}: Props) {
    return (
        <button onClick={onClick} className="w-4/5 px-4 py-2 bg-secondary border border-secondaryaccent rounded-md">
            <FontAwesomeIcon icon={faMagnifyingGlass} data-testid="upcFormMagnifyingGlass" /> Search UPC code
        </button>
    );
}