import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { GroceryList } from "../RecipeSelectionList/RecipeSelectionList";
import type { MyFormValues } from "../Enums/FormFields";
import type { Nutrition } from "../Pages/RecipeDetailPage/RecipeDetailPage";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

export const generateContent = async (prompt: string): Promise<string> => {
  const result = await model.generateContent(prompt); // 👈 no generationConfig, plain text
  return result.response.text();
};

export const generateGroceryList = async (
  recipeTitles: string[],
): Promise<GroceryList> => {
  const prompt = `
    You are a grocery list assistant.
    
    Given the following recipe titles: ${recipeTitles.join(", ")}
    
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
  `;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      // 👈 only for this call
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          "Dairy and Eggs": {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
                recipe: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                },
                quantity: { type: SchemaType.STRING },
              },
            },
          },
          Meat: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
                recipe: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                },
                quantity: { type: SchemaType.STRING },
              },
            },
          },
          Pantry: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
                recipe: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                },
                quantity: { type: SchemaType.STRING },
              },
            },
          },
          Vegetables: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
                recipe: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                },
                quantity: { type: SchemaType.STRING },
              },
            },
          },
        },
      },
    },
  });

  const groceryList: GroceryList = JSON.parse(result.response.text());
  return groceryList;
};

export const generateNutritionInfo = async (
  recipe: MyFormValues,
): Promise<Nutrition> => {
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
`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          fats: { type: SchemaType.NUMBER }, // 👈 object with type
          carbs: { type: SchemaType.NUMBER },
          protein: { type: SchemaType.NUMBER }, // 👈 fixed typo "protien"
          overall_calories: { type: SchemaType.NUMBER },
        },
      },
    },
  });

  const NutritionalInformation: Nutrition = JSON.parse(result.response.text());
  return NutritionalInformation;
};
export const GenerateDescription = async (title: string): Promise<string> => {
  const promt = `You are a professional culinary copywriter. Your task is to write a short, appetizing recipe description based strictly on the provided recipe title.

Adhere to these absolute constraints:
1. Tone: Warm, engaging, and welcoming.
2. Language: Use simple, everyday words accessible to non-native English speakers. Avoid complex culinary jargon or overly poetic metaphors.
3. Length: Exactly 3 to 4 lines of text (approximately 45-60 words total). Do not write more, do not write less.
4. Content: Mention who the dish is perfect for, its primary flavor profile, or when to serve it (e.g., busy weeknights, quick breakfast).

Input Title: ${title}`;

  const result = await generateContent(promt);
  return result;
};

export const GenerateTags = async (
  title: string,
): Promise<{ tags: { name: string }[] }> => {
  const prompt = `
You are a recipe tagging assistant for a food recipe app.

Recipe title: "${title}"

Generate relevant tags for this recipe based ONLY on the words in the title. Do not use any outside knowledge about what ingredients the dish might contain.

Rules:
- Return between 4 and 8 tags
- Tags must come from these categories (only include what clearly applies):
    Cuisine   → Italian, Indian, Mexican, Japanese, Mediterranean, Chinese, Thai, American, French
    Meal type → Breakfast, Lunch, Dinner, Snack, Dessert, Appetizer, Side Dish, Brunch
    Method    → Baked, Grilled, Fried, Slow-Cooker, No-Cook, One-Pot, Air-Fryer, Steamed
    Occasion  → Quick & Easy, Meal Prep, Party, Comfort Food, Healthy, Kid-Friendly
    Dietary   → Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto, Low-Carb, High-Protein
- Each tag must be Title Case and 1–3 words
- No duplicates
- STRICT DIETARY RULE: Only add a Dietary tag if that exact word is present in the recipe title itself (e.g. "Vegan Lentil Soup" → Vegan, "Gluten-Free Pasta" → Gluten-Free). Never infer dietary properties from the dish type, ingredients, or cuisine. If the title does not contain a dietary keyword, do not add any Dietary tags.
`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          tags: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
              },
            },
          },
        },
      },
    },
  });

  const generatedTags = JSON.parse(result.response.text());
  return generatedTags as { tags: { name: string }[] };
};

export const GenerateIngredientQuantity = async (
  title: string,
  servings: number,
): Promise<{ ingredients: { name: string }[] }> => {
  const prompt = `
You are a recipe assistant.

Recipe: ${title}
Servings: ${servings}

Generate a realistic ingredient list scaled to ${servings} servings.

Rules:
- Return each ingredient as a single string with quantity first:
"200g spaghetti", "3 tbsp butter", "5 cloves garlic"
- Scale all quantities exactly to ${servings} servings
- Use standard kitchen units (g, ml, tbsp, tsp, cups, cloves, whole)
- 8–12 ingredients typical for this type of dish
`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          ingredients: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
              },
            },
          },
        },
      },
    },
  });

  const generatedTags = JSON.parse(result.response.text());
  return generatedTags as { ingredients: { name: string }[] };
};
