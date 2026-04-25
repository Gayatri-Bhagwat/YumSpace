import { RxCrossCircled } from "react-icons/rx"
import styles from "../Input/Input.module.css"
import { BiPlusCircle } from "react-icons/bi"
import { type UseFormRegister, useFieldArray, type FieldArrayWithId, type Control, type FieldErrors } from "react-hook-form"
import type { MyFormValues } from "../../Enums/FormFields"
import RecipeDetails from "../RecipeDetails/RecipeDetails"
import { IoInformationCircle } from "react-icons/io5"

export default function TagIngredientInputForm({ header, register, control, name, error }: {
    header: string,
    register: UseFormRegister<MyFormValues>,
    control: Control<MyFormValues>,
    name: "tags" | "ingredients",
    error: FieldErrors<MyFormValues>
}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: name
    })

    return (
        <div>
            <div style={{ marginBottom: "0.5rem" }}>
                <span className={styles.HeaderName}>{header}</span>
            </div>
            <TagIngredientInputElement
                register={register}
                removeItem={remove}
                objectName={name}
                fields={fields}
                key={name}
                error={error}
            />
            <AddButton text={header.toLowerCase()} onClick={() => append({ name: '' })} />
        </div>
    )
}

export function TagIngredientInputElement({ register, fields, objectName, removeItem, error }: {
    register: UseFormRegister<MyFormValues>,
    objectName: "tags" | "ingredients",
    removeItem: (index: number) => void,
    fields: FieldArrayWithId<MyFormValues, "tags" | "ingredients">[],
    error: FieldErrors<MyFormValues>
}) {
    const headerName = `${objectName.substring(0, objectName.length - 1)}`
    return (
        <div className={styles.InputWithButton} style={{ display: "flex", flexDirection: "column" }}>
            {fields.map((field, index) => (
                <>
                    <div key={field.id} style={{ boxSizing: "border-box", display: "flex", marginBottom: "0.5rem", flexDirection: "row", gap: "0.7rem", alignItems: "center" }}>
                        <input
                            className={styles.input}
                            placeholder={`Add ${headerName}`}
                            {...register(`${objectName}.${index}.name` as const, {
                                validate: {
                                    valueNotNull: (value) => value !== "" || "This field cannot be null.",
                                    duplicateValue: (value: string) =>
                                        !fields.some(
                                            (f, i) => i !== index &&  // exclude current field
                                                f.name.toLowerCase() === value.toLowerCase()
                                        ) || 'Duplicate value not allowed',
                                }
                            })}
                            style={{ width: "100%" }}
                        />
                        <RxCrossCircled
                            size="1.4rem"
                            onClick={() => {
                                if (fields.length > 1) {
                                    removeItem(index);
                                }
                            }}
                            style={{ cursor: "pointer", flexShrink: 0 }}
                        />
                    </div>
                    <div className={styles.formError}>
                        {error[objectName]?.[index] && <RecipeDetails
                            icon={IoInformationCircle}
                            content={error[objectName]?.[index]?.['name']?.message as string}
                            color="red"
                            fontSize={0.8}
                            size="1rem" />}
                    </div>
                </>
            ))}
        </div>
    )
}

export function AddButton({ onClick, text }: { onClick: () => void, text: string }) {
    return (
        <button
            className={styles.AddItemToRecipe}
            type="button"
            onClick={onClick}>
            <BiPlusCircle size="1.2rem" />
            <span>Add {text}</span>
        </button>
    )
}