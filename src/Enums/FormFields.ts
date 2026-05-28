import type { Path, RegisterOptions } from "react-hook-form";

export interface MyFormValues {
  id: number;
  title: string;
  description: string;
  tag: { name: string }[]; 
  ingredient: { name: string }[];
  image:string | FileList
  servings:number;
  likes:number;
  time_minutes:number;
  recipe_procedure:{step: number, title:string, text:string, timer:number}[];
}

export interface FieldConfig {
  inputTitle: Path<MyFormValues>,
  InputElement: React.ElementType,
  inputType?: string,
  inputHeader: string,
  rules?: RegisterOptions<MyFormValues, Path<MyFormValues>>
}

export type Ingredient = {
  name: string
  recipe: string[]
  quantity: number
}

export type SelectedGroceryListEnum = {
  "Dairy and Eggs": string[]
  "Meat": string[]
  "Pantry": string[]
  "Vegetables": string[]
}

export type GroceryListEnum = {
  "Dairy and Eggs": Ingredient[]
  "Meat": Ingredient[]
  "Pantry": Ingredient[]
  "Vegetables": Ingredient[]
}