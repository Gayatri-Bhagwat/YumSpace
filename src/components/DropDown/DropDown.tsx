import "./DropDown.css";

export default function DropDown({
  selectOptions,
  value,
  onChange,
  className,
}: {
  selectOptions: string[] | number[];
  value: string | number;
  onChange: (value: string | number) => void 
  className:string
}) {
  return (
    <select
      className={className}
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
