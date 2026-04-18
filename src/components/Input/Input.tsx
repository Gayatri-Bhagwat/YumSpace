import type { UseFormRegister } from "react-hook-form";
import "../Input/Input.css"
import type React from "react";
import type { ReactElement } from "react";
import type { MyFormValues } from "../../Enums/FormFields"


export function FormInput({ register, inputTitle, InputHeader, inputType, InputElement, width }: {
    register: UseFormRegister<MyFormValues>;
    inputTitle:keyof MyFormValues ;
    inputType?: string,
    InputHeader: string,
    InputElement: React.ElementType
    width?: number
})
{
    return (
        <div className="InputElement">
            <span>{InputHeader}</span>
            <InputElement
                placeholder={`Add ${inputTitle.at(0)?.toUpperCase() + inputTitle.substring(1, inputTitle.length)}`}
                style={{width:`${width}rem`}}
                type={inputType}   
                {...register(`${inputTitle}`, { required: "This field is required." })} 
            />
        </div>
    )
}

export function FormInputBasicDetails({children}:{children:ReactElement}) {
    return (
        <div className="BasicRecipeDetailForm">
            {children}
        </div>
    );
}

export function FormInputTimeAndServings({children}:{children:ReactElement})
{
    return (
        <div className="TimeAndServingDetailForm">
            {children}
        </div>
    )
}

