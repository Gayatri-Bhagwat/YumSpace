import "./DropDown.css";

export default function DropDown({
  selectOptions,
  value,
  onChange,
}: {
  selectOptions: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      className="FilterOptions"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        // handleFilters(e.target.value);
      }}
    >
      {selectOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
