export interface MyFormValues {
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