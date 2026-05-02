import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { HiOutlineClock } from "react-icons/hi2";
import type { MyFormValues } from "../../Enums/FormFields";
import "../Input/Input.module.css"
import { RxCrossCircled } from "react-icons/rx";
import { AddButton } from "./TagIngredientInput";
import styles from "../Input/Input.module.css"
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import { IoInformationCircle } from "react-icons/io5";

export default function StepsToPrepareForm({ register, control, error }: {
    register: UseFormRegister<MyFormValues>,
    control: Control<MyFormValues>,
    error: FieldErrors<MyFormValues>
}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "stepsToPrepare"
    });
    return (
        <>
            <div className={styles.StepsToPrepareCard}>
                {fields.map((step, index) => (
                    <>
                        <div className={styles.stepCards} key={step.id}>
                            <div className={styles.HeaderAndCrossButton}>
                                <span {...register(`stepsToPrepare.${index}.step`)} className={styles.stepNumber}>Step {index + 1}</span>
                                <RxCrossCircled onClick={() => {
                                    if (fields.length > 1)
                                        remove(index)
                                }} style={{ cursor: "pointer" }} size="1.5rem" />
                            </div>
                            <input className={styles.input} {...register(`stepsToPrepare.${index}.title`, {
                                validate: {
                                    positive: (value) => value != "" || "This field cannot be blank",
                                    duplicateValue: (value: string) =>
                                        !fields.some(
                                            (f, i) => i !== index &&  // exclude current field
                                                f.title.toLowerCase() === value.toLowerCase()
                                        ) || 'Duplicate value not allowed',
                                }
                            })} placeholder="Step title eg.Kneeding" />
                            <ErrorMessage error={error} index={index} value='title' />
                            <textarea className={styles.textarea} {...register(`stepsToPrepare.${index}.text`, {
                                validate: (value) => value != "" || "This field cannot be blank"
                            })} placeholder="Description of the step" />
                            <ErrorMessage error={error} index={index} value='text' />
                            <div className={styles.TotalMinRequired}>
                                <HiOutlineClock size="1.2rem" color="#635c58" />
                                <input className={styles.input} key={step.step}
                                    min={0}
                                    {...register(`stepsToPrepare.${index}.timeToPrepare`, {
                                        valueAsNumber: true,
                                    })} type="number" /> mins (Optional)
                            </div>
                            <ErrorMessage error={error} index={index} value='timeToPrepare' />
                        </div>
                    </>
                ))}
            </div>
            <AddButton onClick={() => append({ step: fields.length + 1, 'text': '', timeToPrepare: 0, title: "" })}
                text="steps" />
        </>
    );
}

export function ErrorMessage({ error, index, value }: {
    error: FieldErrors<MyFormValues>,
    index: number,
    value: keyof MyFormValues['stepsToPrepare'][number]
}) {
    return <div className="formError">
        {error && error['stepsToPrepare'] &&
            <RecipeDetails
                icon={IoInformationCircle}
                content={error?.stepsToPrepare?.[index]?.[value]?.message as string}
                fontSize={0.8}
                size="1rem"
                color="red"
            />
        }
    </div>
}