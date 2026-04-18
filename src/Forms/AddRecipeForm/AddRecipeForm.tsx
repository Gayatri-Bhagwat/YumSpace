import { PiNotePencilFill } from "react-icons/pi";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import { RxCrossCircled } from "react-icons/rx";
import "../AddRecipeForm/AddRecipeForm.css"
import { useForm } from "react-hook-form";
import { FormInput, FormInputBasicDetails, FormInputTimeAndServings } from "../../components/Input/Input";
import TagIngredientInputForm from "../../components/Input/TagIngredientInput";
import type { MyFormValues } from "../../Enums/FormFields";
import StepsToPrepareForm from "../../components/Input/StepsInput";

export default function AddRecipeForm({ recipe, setRecipe, isFormVisible, formVisible }: {
    recipe: MyFormValues[],
    setRecipe: (recipe: MyFormValues[]) => void,
    isFormVisible: (value: boolean) => void,
    formVisible :boolean
}) {

    const { control, register, handleSubmit, formState: { errors }, getValues } = useForm<MyFormValues>({
        mode: "all",
        defaultValues: {
            tags: [{ name: "" }],
            ingredients: [{ name: "" }],
            title: "",
            description: "",
            servings: 0,
            preptime: 0,
            likes: 0,
            stepsToPrepare: [{ step: 1, title: "", text: "", timeToPrepare: 0 }],
        }
    });

    console.log("errors", errors)
    const imageValue = getValues("image")
    // console.log()
    const AddRecipeData = (data: MyFormValues) => {
        console.log(data);
        console.log(URL.createObjectURL(imageValue[0].name))
        setRecipe([...recipe, data]);
        console.log(data, "Added recipe")
                    isFormVisible(false)

    }

    return (
        <>
            {formVisible && <form className="AddFormCard" >
                <div className="FormHeader">
                    <RecipeDetails icon={PiNotePencilFill} size={"1.2rem"} content="Add Recipe" color="#e8773d" />
                    <RxCrossCircled size="1.6rem" color="#e8773d" onClick={() => {
                        isFormVisible(false)
                    }} />
                </div>
                <div className="BasicRecipeInfo">
                    <span style={{ fontWeight: 500, color: "#2d1f14" }}>BASIC INFO</span>
                    <FormInputBasicDetails>
                        <>
                            <FormInput register={register} InputElement="input" inputTitle="title" InputHeader="Recipe Title" />
                            <FormInput register={register} InputElement="input" inputTitle="image" inputType="file" InputHeader="Image URL" />
                            <FormInput register={register} InputElement="textarea" inputTitle="description" InputHeader="Description" />
                        </>
                    </FormInputBasicDetails>
                </div>

                <div className="TimeAndServingDetails">
                    <span style={{ fontWeight: 500, color: "#2d1f14" }}>TIME & SERVINGS</span>
                    <FormInputTimeAndServings>
                        <>
                            <FormInput register={register} width={8.75} InputElement="input" inputType="number" inputTitle="servings" InputHeader="Servings" />
                            <FormInput register={register} width={8.75} InputElement="input" inputType="number" inputTitle="likes" InputHeader="Likes" />
                            <FormInput register={register} width={8.75} InputElement="input" inputType="number" inputTitle="preptime" InputHeader="Prep time" />
                        </>
                    </FormInputTimeAndServings>
                </div>
                <div className="TagsInput">
                    <TagIngredientInputForm header="TAGS"
                        register={register}
                        control={control}
                        name={"tags"} />
                </div>
                <div className="IngredientInput">
                    <TagIngredientInputForm header="INGREDIENTS"
                        register={register}
                        control={control}
                        name={"ingredients"} />
                </div>
                <div className="StepInput">
                    <span style={{ fontWeight: 500, color: "#2d1f14" }}>STEPS</span>
                    <StepsToPrepareForm register={register} control={control} />
                </div>
                <button className="SaveButton" type="button" onClick={
                    handleSubmit(AddRecipeData)
                }>Save Recipe</button>
            </form>
            }
        </>
    )
}
