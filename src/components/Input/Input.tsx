import {
  type FieldError,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import styles from "../Input/Input.module.css";
import type { FieldConfig, MyFormValues } from "../../Enums/FormFields";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import { IoInformationCircle } from "react-icons/io5";
import { useState } from "react";
import { GenerateDescription } from "../../services/gemini";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface Props {
  register: UseFormRegister<MyFormValues>;
  error: FieldErrors<MyFormValues>;
  formData: FieldConfig[];
  getTitle?: () => string;
  setDescription?: (val: string) => void;
}
export function FormInput({
  register,
  error,
  field,
  getTitle,
  setDescription,
}: {
  register: UseFormRegister<MyFormValues>;
  field: FieldConfig;
  error: FieldErrors<MyFormValues>;
  getTitle?: () => string;
  setDescription?: (val: string) => void;
}) {
  const [generateDescription, setGenerateDescription] = useState(false);
  const { inputHeader, InputElement, inputTitle, inputType, rules } = field;
  const title = getTitle?.() ?? "";
  const titleMissing = !title.trim();
  const handleGenerateDescription = async () => {
    if (!title.trim()) return;
    setGenerateDescription(true);
    try {
      const description = await GenerateDescription(title);
      setDescription?.(description);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerateDescription(false);
    }
  };
  const errorMessage = (error as Record<string, FieldError | undefined>)?.[
    inputTitle
  ]?.message;
  return (
    <div className={styles.InputElement}>
      <span>{inputHeader}</span>
      {InputElement === "textarea" ? (
        generateDescription ? (
          <Skeleton
            count={1}
            height={100}
            baseColor="#f0e6dc"
            highlightColor="#faf0e8"
            borderRadius="12px"
            style={{ marginBottom: "0.5rem" }}
          />
        ) : (
          <InputElement
            className={styles.textarea}
            placeholder={`Add ${
              inputTitle.charAt(0).toUpperCase() + inputTitle.slice(1)
            }`}
            {...register(inputTitle, rules)}
          />
        )
      ) : (
        <InputElement
          className={styles.input}
          placeholder={`Add ${
            inputTitle.charAt(0).toUpperCase() + inputTitle.slice(1)
          }`}
          type={inputType}
          min={0}
          {...register(inputTitle, rules)}
        />
      )}

      {errorMessage && (
        <RecipeDetails
          icon={IoInformationCircle}
          content={errorMessage}
          size="1rem"
          fontSize={0.8}
          color="red"
        />
      )}
      {InputElement === "textarea" && (
        <button
          type="button"
          className={styles.AddItemToRecipe}
          onClick={handleGenerateDescription}
          style={
            titleMissing
              ? {
                  opacity: 0.5,
                  cursor: "not-allowed",
                  backgroundColor: "#E8521A",
                  color: "white",
                }
              : { backgroundColor: "#E8521A", color: "white" }
          }
        >
          Generate Description
        </button>
      )}
    </div>
  );
}

export function FormInputBasicDetails({
  register,
  error,
  formData,
  getTitle,
  setDescription,
}: Props) {
  return (
    <div className={styles.BasicRecipeDetailForm}>
      {formData.map((field) => (
        <FormInput
          key={field.inputTitle}
          register={register}
          error={error}
          field={field}
          getTitle={getTitle}
          setDescription={setDescription}
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
  );
}
