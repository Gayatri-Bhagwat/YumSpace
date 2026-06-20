import type { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import styles from "../Input/Input.module.css"
import type { FieldConfig, MyFormValues } from "../../Enums/FormFields"
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import { IoInformationCircle } from "react-icons/io5";


export interface Props {
    register: UseFormRegister<MyFormValues>;
    error: FieldErrors<MyFormValues>;
    formData: FieldConfig[];
}
export function FormInput({ register, width, error, field }: {
    register: UseFormRegister<MyFormValues>;
    width?: number,
    field: FieldConfig,
    error: FieldErrors<MyFormValues>
}) {
    const { inputHeader, InputElement, inputTitle, inputType, rules } = field;
    const errorMessage = (error as Record<string, FieldError | undefined>)?.[inputTitle]?.message;
    return (
        <div className={styles.InputElement}>
            <span>{inputHeader}</span>
            <InputElement className={InputElement === 'textarea' ? styles.textarea : styles.input}
                placeholder={`Add ${inputTitle.at(0)?.toUpperCase() + inputTitle.substring(1, inputTitle.length)}`}
                type={inputType}
                min={0}
                {...register(inputTitle, rules)}
            />
            {
                errorMessage &&
                <RecipeDetails
                    icon={IoInformationCircle}
                    content={errorMessage}
                    size="1rem"
                    fontSize={0.8}
                    color="red"
                />
            }
        </div>
    )
}

export function FormInputBasicDetails({ register, error, formData }: Props) {
    return (
        <div className={styles.BasicRecipeDetailForm}>
            {formData.map((field) => (
                <FormInput
                    key={field.inputTitle}
                    register={register}
                    error={error}
                    field={field}
                />
            ))}
        </div>
    );
}

export function FormInputTimeAndServings({ register, error, formData }: Props) {
    return (
        <div className={styles.TimeAndServingDetailForm}>
            {formData.map((field) => (
                <FormInput
                    key={field.inputTitle}
                    register={register}
                    error={error}
                    field={field}
                />
            ))}
        </div>
    )
}

