import { PiNotePencilFill } from "react-icons/pi";
import { RxCrossCircled } from "react-icons/rx";
import "../AddRecipeForm/AddRecipeForm.css"
import { useForm } from "react-hook-form";
import { FormInputBasicDetails, FormInputTimeAndServings } from "../../components/Input/Input";
import TagIngredientInputForm from "../../components/Input/TagIngredientInput";
import type { FieldConfig, MyFormValues } from "../../Enums/FormFields";
import StepsToPrepareForm from "../../components/Input/StepsInput";

export default function AddRecipeForm({ setRecipe, isFormVisible, formVisible }: {
    setRecipe: (React.Dispatch<React.SetStateAction<MyFormValues[]>>)
    isFormVisible: (value: boolean) => void,
    formVisible: boolean
}) {

    const basicDetailFields: FieldConfig[] = [
        {
            inputTitle: "title", InputElement: "input", inputHeader: "Recipe Title", inputType: "text", rules: {
                required: "This field cannot be blank."
            }
        },
        {
            inputTitle: "image", InputElement: "input", inputHeader: "Image URL", inputType: "file", rules: {
                required: "This field cannot be blank."
            }
        },
        {
            inputTitle: "description", InputElement: "textarea", inputHeader: "Description", inputType: "text", rules: {
                required: "This field cannot be blank."
            }
        },
    ];

    const timeServingsDetails: FieldConfig[] = [
        {
            inputType: "number", inputTitle: "servings", InputElement: "input", inputHeader: "Servings", rules: {
                required: "This field is required.",
                // @ts-ignore
                validate: { positive: (value: number) => value > 0 || 'Servings must be greater than 0.' }
            }
        },
        {
            InputElement: "input", inputType: "number", inputTitle: "likes", inputHeader: "Likes", rules: {
                required: "This field is required.",
            }
        },
        {
            InputElement: "input", inputType: "number", inputTitle: "preptime", inputHeader: "Prep time", rules: {
                required: "This field is required.",
                // @ts-ignore
                validate: { positive: (value: number) => value > 0 || 'Servings must be greater than 0.' }
            }
        }
    ]

    const { control, register, handleSubmit, formState: { errors }, getValues } = useForm<MyFormValues>({
        mode: "all",
        defaultValues: {
            title: "",
            preptime: 0,
            servings: 0,
            description: "",
            likes: 0,
            tags: [{ name: "" }],
            ingredients: [{ name: "" }],
            stepsToPrepare: [{ step: 1, title: "", text: "", timeToPrepare: 0 }],
        }
    });

    console.log("errors", errors)
    const AddRecipeData = (data: MyFormValues) => {
        const imageVal = getValues("image")
        const updatedData = {
            ...data,
            image: URL.createObjectURL(imageVal[0] as File)
        }
        setRecipe(prev => [...prev, updatedData]);
        console.log(data, "Added recipe")
        isFormVisible(false)
    }

    return (
        <>
            {formVisible && <form className="AddFormCard" >
                <div
                    className="FormHeader"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                            style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                background: "#fdf0e8",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <PiNotePencilFill size="1.1rem" color="#e8773d" />
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: "medium" }}>Add recipe</p>
                            <p style={{ margin: 0, fontSize: "small", color: "#888" }}>Fill in the details below</p>
                        </div>
                    </div>
                    <RxCrossCircled onClick={() => isFormVisible(false)} size="1.5rem" color="#e8773d" />
                </div>
                <hr></hr>
                <div className="BasicRecipeInfo">
                    <span style={{ fontWeight: 500, color: "#2d1f14" }}>BASIC INFO</span>
                    <FormInputBasicDetails register={register} error={errors} formData={basicDetailFields}>
                    </FormInputBasicDetails>
                </div>
                <div className="TimeAndServingDetails">
                    <span style={{ fontWeight: 500, color: "#2d1f14" }}>TIME & SERVINGS</span>
                    <FormInputTimeAndServings register={register} formData={timeServingsDetails} error={errors}>
                    </FormInputTimeAndServings>
                </div>
                <div className="TagsInput">
                    <TagIngredientInputForm header="TAGS"
                        register={register}
                        control={control}
                        name={"tags"}
                        error={errors} />
                </div>
                <div className="IngredientInput">
                    <TagIngredientInputForm header="INGREDIENTS"
                        register={register}
                        control={control}
                        name={"ingredients"}
                        error={errors} />
                </div>
                <div className="StepInput">
                    <span style={{ fontWeight: 500, color: "#2d1f14" }}>STEPS</span>
                    <StepsToPrepareForm register={register} control={control} error={errors} />
                </div>
                <button className="SaveButton" type="button" onClick={
                    handleSubmit(AddRecipeData)
                }>Save Recipe</button>
            </form>
            }
        </>
    )
}
