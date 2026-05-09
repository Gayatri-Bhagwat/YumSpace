import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { GroceryList } from "../RecipeSelectionList/RecipeSelectionList";

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