import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { GroceryList } from "../RecipeSelectionList/RecipeSelectionList";
import type { MyFormValues } from "../Enums/FormFields";
import type { Nutrition } from "../Pages/RecipeDetailPage/RecipeDetailPage";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" })

export const generateContent = async (prompt: string): Promise<string> => {
  const result = await model.generateContent(prompt) // 👈 no generationConfig, plain text
  return result.response.text()
}

export const generateGroceryList = async (recipeTitles: string[]): Promise<GroceryList> => {
  const prompt = `
    You are a grocery list assistant.
    
    Given the following recipe titles: ${recipeTitles.join(', ')}
    
    Generate a structured grocery list by analyzing all ingredients needed for these recipes.
    
    Rules:
    - Categorize each ingredient into: "Dairy and Eggs", "Meat", "Pantry", or "Vegetables"
    - If an ingredient appears in multiple recipes, combine the quantity and list all recipe names in the "recipe" array
    - "quantity" should be a realistic amount with proper units such as:
      * Weight: g, kg, mg
      * Volume: ml, L, tbsp, tsp, cup
      * Count: pieces, whole, cloves, slices
      * Other: pinch, handful, bunch
    Examples: "200g", "2 tbsp", "4 cloves", "1 cup", "500ml", "2 pieces"
    - "name" should be a clean ingredient name
    - Do not include duplicates
  `

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {                          // 👈 only for this call
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          "Dairy and Eggs": {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name:     { type: SchemaType.STRING },
                recipe:   { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                quantity: { type: SchemaType.STRING }
              }
            }
          },
          "Meat": {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name:     { type: SchemaType.STRING },
                recipe:   { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                quantity: { type: SchemaType.STRING }
              }
            }
          },
          "Pantry": {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name:     { type: SchemaType.STRING },
                recipe:   { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                quantity: { type: SchemaType.STRING }
              }
            }
          },
          "Vegetables": {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name:     { type: SchemaType.STRING },
                recipe:   { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                quantity: { type: SchemaType.STRING }
              }
            }
          }
        }
      }
    }
  })

  const groceryList: GroceryList = JSON.parse(result.response.text())
  console.log(groceryList)
  return groceryList
}


export const generateNutritionInfo = async (recipe: MyFormValues): Promise<Nutrition> => {
  const prompt = `
  You are a professional nutritionist and dietitian.
  
  Calculate the nutritional information for the following recipe: "${recipe.title}"
  with ${recipe.servings} servings.

  Rules:
  - Calculate values PER SERVING
  - "calories" should be total KCal per serving (number only, no units)
  - "protein" should be in grams per serving (number only, no units)
  - "carbs" should be in grams per serving (number only, no units)
  - "fats" should be in grams per serving (number only, no units)
  - Base calculations on standard ingredient portions typically used in this recipe
  - Values should be realistic and accurate for this type of dish
  
  Example for Pasta Carbonara (1 serving):
  {
    "calories": 480,
    "protein": 22,
    "carbs": 52,
    "fats": 18
  }
`

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          fats: { type: SchemaType.NUMBER },  // 👈 object with type
          carbs: { type: SchemaType.NUMBER },
          protein: { type: SchemaType.NUMBER },  // 👈 fixed typo "protien"
          overall_calories: { type: SchemaType.NUMBER }
        }
      }
    }
  })

  const NutritionalInformation: Nutrition = JSON.parse(result.response.text())
  console.log(NutritionalInformation, "information")
  return NutritionalInformation;
}