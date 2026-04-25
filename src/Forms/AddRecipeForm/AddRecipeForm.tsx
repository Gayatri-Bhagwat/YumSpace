import { PiNotePencilFill } from "react-icons/pi";
import { RxCrossCircled } from "react-icons/rx";
import "../AddRecipeForm/AddRecipeForm.css"
import { useForm } from "react-hook-form";
import { FormInputBasicDetails, FormInputTimeAndServings } from "../../components/Input/Input";
import TagIngredientInputForm from "../../components/Input/TagIngredientInput";
import type { FieldConfig, MyFormValues } from "../../Enums/FormFields";
import StepsToPrepareForm from "../../components/Input/StepsInput";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, editRecipe } from "../../features/addRecipe/addRecipeSlice";
import { hideRecipeForm } from "../../features/showRecipeForm/showRecipeSlice";
import type { RootState } from "../../stores/store";
import { useEffect, useMemo } from "react";

export default function AddRecipeForm() {

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
                // @ts-expect-error suppress warning
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
                // @ts-expect-error suppress warning
                validate: { positive: (value: number) => value > 0 || 'Servings must be greater than 0.' }
            }
        }
    ]
    const dispatch = useDispatch()
    const { visible, selectedRecipe, mode } = useSelector((state: RootState) => state.showRecipe)
    const defaultRecipeData = useMemo(() => ({
        title: "",
        preptime: 0,
        servings: 0,
        description: "",
        likes: 0,
        tags: [{ name: "" }],
        ingredients: [{ name: "" }],
        stepsToPrepare: [{ step: 1, title: "", text: "", timeToPrepare: 0 }],
    }), [])
    const { control, register, handleSubmit, reset, formState: { errors }, getValues } = useForm<MyFormValues>({
        mode: "all",
        defaultValues: selectedRecipe ?? defaultRecipeData
    });

    const AddRecipeData = (data: MyFormValues) => {
        const imageVal = getValues("image")
        const updatedData = {
            ...data,
            image: URL.createObjectURL(imageVal[0] as File)
        }
        if (mode === 'add') {

            dispatch(addRecipe(updatedData))
            console.log(data, "Added recipe")
        }
        else {
            console.log('updating recipe...')
            dispatch(editRecipe(updatedData))
        }
        dispatch(hideRecipeForm())
    }

    useEffect(() => {
        if (mode === 'edit' && selectedRecipe) {
            reset(selectedRecipe)
        }
        else {
            reset(defaultRecipeData)
        }
    }, [selectedRecipe, mode, defaultRecipeData, reset])
    return (
        <>
            {visible && <form className="AddFormCard" >
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
                            <p style={{ margin: 0, fontSize: "medium" }}>{mode !== 'add' ? "Edit" : "Add"} Recipe</p>
                            <p style={{ margin: 0, fontSize: "small", color: "#888" }}>Fill in the details below</p>
                        </div>
                    </div>
                    <RxCrossCircled onClick={() => dispatch(hideRecipeForm())} size="1.5rem" color="#e8773d" />
                </div>
                <hr></hr>
                <div className="BasicRecipeInfo">
                    <span style={{ fontWeight: 500, color: "#2d1f14" }}>BASIC INFO</span>
                    <FormInputBasicDetails
                        register={register}
                        error={errors}
                        formData={basicDetailFields}
                    />
                </div>
                <div className="TimeAndServingDetails">
                    <span style={{ fontWeight: 500, color: "#2d1f14" }}>TIME & SERVINGS</span>
                    <FormInputTimeAndServings
                        register={register}
                        formData={timeServingsDetails}
                        error={errors}
                    />
                </div>
                <div className="TagsInput">
                    <TagIngredientInputForm header="TAGS"
                        register={register}
                        control={control}
                        name={"tags"}
                        error={errors}
                    />
                </div>
                <div className="IngredientInput">
                    <TagIngredientInputForm header="INGREDIENTS"
                        register={register}
                        control={control}
                        name={"ingredients"}
                        error={errors}
                    />
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
