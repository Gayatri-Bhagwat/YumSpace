import type { Path, RegisterOptions } from "react-hook-form";

export interface MyFormValues {
  id:number;
  title: string;
  description: string;
  tags: { name: string }[]; 
  ingredients: { name: string }[];
  image:string | FileList
  servings:number;
  likes:number;
  preptime:number;
  stepsToPrepare:{step: number, title:string, text:string, timeToPrepare:number}[];
}

export interface FieldConfig {
   inputTitle: Path<MyFormValues>,
   InputElement: React.ElementType,
   inputType?: string,
   inputHeader: string,
  rules?: RegisterOptions<MyFormValues, Path<MyFormValues>>
}