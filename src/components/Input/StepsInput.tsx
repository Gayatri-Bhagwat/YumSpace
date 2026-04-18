import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { HiOutlineClock } from "react-icons/hi2";
import type { MyFormValues } from "../../Enums/FormFields";
import "../Input/Input.css"
import { RxCrossCircled } from "react-icons/rx";
import { AddButton } from "./TagIngredientInput";

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
            <div className="StepsToPrepareCard">
                {fields.map((step, index) => (
                    <div className="stepCard" key={step.id}>
                        <div className="HeaderAndCrossButton">
                            <span className="stepNumber">Step {index + 1}</span>
                            <RxCrossCircled onClick={()=>remove(index)} style={{ cursor: "pointer" }} size="1.5rem" />
                        </div>
                        <input {...register(`stepsToPrepare.${index}.title`, {
                            validate: (value) => value != "" || "This field cannot be blank"
                        })} placeholder="Step title eg.Kneeding" />
                        <textarea {...register(`stepsToPrepare.${index}.text`, {
                            validate: (value) => value != "" || "This field cannot be blank"
                        })} placeholder="Description of the step" />
                        <div className="TotalMinRequired">
                            <HiOutlineClock size="1.5rem" color="" />
                            <input key={step.step}
                                {...register(`stepsToPrepare.${index}.timeToPrepare`, {
                                    valueAsNumber: true,
                                    validate: (value) => value > 0 || "Time value should be greater than 0"
                                })} type="number" /> mins
                        </div>
                    </div>
                ))}
            </div>
            <AddButton onClick={() => append({ step: 0, 'text': '', timeToPrepare: 0, title: "" })} 
            text= "steps" />
        </>
    );
}