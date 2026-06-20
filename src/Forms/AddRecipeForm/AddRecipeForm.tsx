import { PiNotePencilFill } from "react-icons/pi";
import { RxCrossCircled } from "react-icons/rx";
import "../AddRecipeForm/AddRecipeForm.css";
import { useForm } from "react-hook-form";
import {
  FormInputBasicDetails,
  FormInputTimeAndServings,
} from "../../components/Input/Input";
import TagIngredientInputForm from "../../components/Input/TagIngredientInput";
import type { FieldConfig, MyFormValues } from "../../Enums/FormFields";
import StepsToPrepareForm from "../../components/Input/StepsInput";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, editRecipe } from "../../features/addRecipe/addRecipeSlice";
import { hideRecipeForm } from "../../features/showRecipeForm/showRecipeSlice";
import type { RootState } from "../../stores/store";
import { useEffect, useMemo } from "react";
import { addNewRecipe, editExistingRecipe } from "../../services/APIService";

export default function AddRecipeForm() {
  const { visible, selectedRecipe, mode } = useSelector(
    (state: RootState) => state.showRecipe,
  );
  const basicDetailFields: FieldConfig[] = [
    {
      inputTitle: "title",
      InputElement: "input",
      inputHeader: "Recipe Title",
      inputType: "text",
      rules: {
        required: "This field cannot be blank.",
      },
    },
    {
      inputTitle: "image",
      InputElement: "input",
      inputHeader: "Image URL",
      inputType: "file",
      rules: {
        required: mode === "add" ? "This field cannot be blank." : false,
      },
    },
    {
      inputTitle: "description",
      InputElement: "textarea",
      inputHeader: "Description",
      inputType: "text",
      rules: {
        required: "This field cannot be blank.",
      },
    },
  ];

  const timeServingsDetails: FieldConfig[] = [
    {
      inputType: "number",
      inputTitle: "servings",
      InputElement: "input",
      inputHeader: "Servings",
      rules: {
        required: "This field is required.",
        valueAsNumber: true,
        validate: {
          // @ts-expect-error suppress warning
          positive: (value: number) =>
            value > 0 || "Servings must be greater than 0.",
        },
      },
    },
    {
      InputElement: "input",
      inputType: "number",
      inputTitle: "likes",
      inputHeader: "Likes",
      rules: {
        required: "This field is required.",
        valueAsNumber: true,
      },
    },
    {
      InputElement: "input",
      inputType: "number",
      inputTitle: "time_minutes",
      inputHeader: "Prep time",
      rules: {
        required: "This field is required.",
        valueAsNumber: true,
        validate: {
          // @ts-expect-error suppress warning
          positive: (value: number) =>
            value > 0 || "Servings must be greater than 0.",
        },
      },
    },
  ];
  const dispatch = useDispatch();
  const defaultRecipeData = useMemo(
    () => ({
      title: "",
      time_minutes: 0,
      servings: 0,
      description: "",
      price: 0,
      likes: 0,
      tag: [{ name: "" }],
      ingredient: [{ name: "" }],
      recipe_procedure: [{ step: 1, title: "", text: "", timer: 0 }],
    }),
    [],
  );
  const {
    control,
    register,
    handleSubmit,
    reset,
    unregister,
    formState: { errors },
  } = useForm<MyFormValues>({
    mode: "all",
    defaultValues: selectedRecipe ?? defaultRecipeData,
  });

  const AddRecipeData = async (data: MyFormValues) => {
    const imageVal: string | File =
      data.image instanceof FileList
        ? data.image[0]
        : data.image instanceof File
          ? data.image
          : (data.image as string);

    let response = null;
    const updatedData = {
      ...data,
      price: 200,
      image:
        imageVal instanceof File
          ? URL.createObjectURL(imageVal) // 👈 string for Redux, no FileList
          : imageVal,
    };

    if (mode === "add") {
      response = await addNewRecipe({
        ...data,
        image: imageVal,
      });
      if (response.success) {
        dispatch(addRecipe({ ...response.data, image: updatedData.image }));
        dispatch(hideRecipeForm());
      }
    } else {
      response = await editExistingRecipe(data, data.id);
      if (response.success) {
        dispatch(editRecipe({ ...response.data, image: updatedData.image }));
        dispatch(hideRecipeForm());
      }
    }
  };

  useEffect(() => {
    if (mode === "edit" && selectedRecipe) {
      reset(selectedRecipe);
      // unregister('image')
    } else {
      reset(defaultRecipeData);
    }
  }, [selectedRecipe, mode, defaultRecipeData, reset, unregister]);
  return (
    <>
      {visible && (
        <form className="AddFormCard">
          <div className="FormHeader">
            <div className="FormHeaderTitle">
              <div className="FormHeaderIcon">
                <PiNotePencilFill size="1.1rem" color="#e8773d" />
              </div>
              <div>
                <p className="FormHeaderName">
                  {mode !== "add" ? "Edit" : "Add"} Recipe
                </p>
                <p className="FormHeaderSub">Fill in the details below</p>
              </div>
            </div>
            <RxCrossCircled
              onClick={() => dispatch(hideRecipeForm())}
              size="1.5rem"
              color="#e8773d"
              style={{ cursor: "pointer", flexShrink: 0 }}
            />
          </div>
          <div className="BasicRecipeInfo SectionCard">
            <span className="SectionLabel">BASIC INFO</span>
            <FormInputBasicDetails
              register={register}
              error={errors}
              formData={basicDetailFields}
            />
          </div>
          <div className="TimeAndServingDetails SectionCard">
            <span className="SectionLabel">TIME & SERVINGS</span>
            <FormInputTimeAndServings
              register={register}
              formData={timeServingsDetails}
              error={errors}
            />
          </div>
          <div className="TagsInput SectionCard">
            <TagIngredientInputForm
              header="TAGS"
              register={register}
              control={control}
              name={"tag"}
              error={errors}
            />
          </div>
          <div className="IngredientInput SectionCard">
            <TagIngredientInputForm
              header="INGREDIENTS"
              register={register}
              control={control}
              name={"ingredient"}
              error={errors}
            />
          </div>
          <div className="StepInput SectionCard">
            <span className="SectionLabel">STEPS</span>
            <StepsToPrepareForm
              register={register}
              control={control}
              error={errors}
            />
          </div>
          <div className="SaveButtonWrapper">
            <button
              className="SaveButton"
              type="button"
              onClick={handleSubmit(AddRecipeData)}
            >
              Save Recipe
            </button>
          </div>
        </form>
      )}
    </>
  );
}
