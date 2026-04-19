import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { HiOutlineClock } from "react-icons/hi2";
import type { MyFormValues } from "../../Enums/FormFields";
import "../Input/Input.module.css"
import { RxCrossCircled } from "react-icons/rx";
import { AddButton } from "./TagIngredientInput";
import styles from "../Input/Input.module.css"

export default function StepsToPrepareForm({ register, control }: {
    register: UseFormRegister<MyFormValues>,
    control: Control<MyFormValues>
}) {

    const { fields, append, remove } = useFieldArray({
        control,
        name: "stepsToPrepare"
    });
    return (
        <>
            <div className={styles.StepsToPrepareCard}>
                {fields.map((step, index) => (
                    <div className={styles.stepCards} key={step.id}>
                        <div className={styles.HeaderAndCrossButton}>
                            <span {...register(`stepsToPrepare.${index}.step`)} className={styles.stepNumber}>Step {index + 1}</span>
                            <RxCrossCircled onClick={() => {
                                if (fields.length > 1)
                                    remove(index)
                            }} style={{ cursor: "pointer" }} size="1.5rem" />
                        </div>
                        <input className={styles.input} {...register(`stepsToPrepare.${index}.title`, {
                            validate: (value) => value != "" || "This field cannot be blank"
                        })} placeholder="Step title eg.Kneeding" />
                        <textarea className={styles.textarea} {...register(`stepsToPrepare.${index}.text`, {
                            validate: (value) => value != "" || "This field cannot be blank"
                        })} placeholder="Description of the step" />
                        <div className={styles.TotalMinRequired}>
                            <HiOutlineClock size="1.2rem" color="#635c58" />
                            <input className={styles.input} key={step.step}
                                {...register(`stepsToPrepare.${index}.timeToPrepare`, {
                                    valueAsNumber: true,
                                    validate: (value) => value > 0 || "Time value should be greater than 0"
                                })} type="number" /> mins
                        </div>
                    </div>
                ))}
            </div>
            <AddButton onClick={() => append({ step: StepsToPrepareForm.length + 1, 'text': '', timeToPrepare: 0, title: "" })}
                text="steps" />
        </>
    );
}