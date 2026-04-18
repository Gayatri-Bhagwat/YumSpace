import { RxCrossCircled } from "react-icons/rx"
import "../input/input.css"
import { BiPlusCircle } from "react-icons/bi"
import { type UseFormRegister, useFieldArray, type FieldArrayWithId, type Control } from "react-hook-form"
import type { MyFormValues } from "../../Enums/FormFields"

export default function TagIngredientInputForm({ header, register, control, name }: {
    header: string,
    register: UseFormRegister<MyFormValues>,
    control: Control<MyFormValues>,
    name: "tags" | "ingredients"
}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: name
    })

    return (
        <div>
            <div style={{ marginBottom: "0.5rem" }}>
                <span className="HeaderName">{header}</span>
            </div>
            <TagIngredientInputElement
                register={register}
                removeItem={remove}
                objectName={name}
                fields={fields}
            />
            <AddButton text={header.toLowerCase()} onClick={() => append({ name: '' })} />
        </div>
    )
}

export function TagIngredientInputElement({ register, fields, objectName, removeItem }: {
    register: UseFormRegister<MyFormValues>,
    objectName: "tags" | "ingredients",
    removeItem: (index: number) => void,
    fields: FieldArrayWithId<MyFormValues, "tags" | "ingredients">[]  // ✅ fixed generic
}) {
    return (
        <div className="InputWithButton" style={{ display: "flex", flexDirection: "column", gap: "0rem" }}>
            {fields.map((field, index) => (
                <div key={field.id} style={{ display: "flex", flexDirection: "row",gap: "0.7rem", alignItems:"center" }}>
                    <input
                        placeholder={`Add ${objectName.substring(0, objectName.length - 1)}`}
                        {...register(`${objectName}.${index}.name` as const, {
                            validate: (value) => value !== "" || "This field cannot be null.",  // ✅ no empty values
                        })}
                        style={{ width: "100%", marginBottom: "1rem" }}
                        autoFocus
                    />
                    <RxCrossCircled
                        size="1.5rem"
                        onClick={() => {
                            if (fields.length > 1) {
                                removeItem(index);
                            }
                        }}
                        style={{ cursor: "pointer", flexShrink: 0 }}
                    />
                </div>
            ))}
        </div>
    )
}

export function AddButton({ onClick, text }: { onClick: () => void, text: string }) {
    return (
        <button
            className="AddItemToRecipe"
            type="button"
            onClick={onClick}
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.3rem",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px"
            }}>
            <BiPlusCircle size="1.2rem" />
            <span>Add {text}</span>
        </button>
    )
}