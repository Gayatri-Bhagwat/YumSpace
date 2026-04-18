import "./DropDown.css";
export default function DropDown({selectOptions}:{selectOptions:string[]}) {
    return (
        <select className="FilterOptions">
            {selectOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    )
}