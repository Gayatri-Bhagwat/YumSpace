import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { GroceryList } from "../RecipeSelectionList/RecipeSelectionList";
import type { MyFormValues } from "../Enums/FormFields";
import type { Nutrition } from "../Pages/RecipeDetailPage/RecipeDetailPage";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

async function withRetry<T>(
  fn: () => Promise<T>,
  validate: (r: T) => boolean,
  retries = 1,
): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    const result = await fn();
    if (validate(result)) return result;
    if (i < retries) await new Promise((r) => setTimeout(r, 800));
  }
  throw new Error("Gemini returned incomplete data after retries.");
}

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

CRITICAL: You MUST return a "tags" array with 4 to 6 items. Never return an empty array.

Generate relevant tags. You may use general knowledge about the dish type implied by the title.

Rules:
- ALWAYS return 4–6 tags. If the title is vague, use general food categories (e.g. "Dinner", "Comfort Food", "Quick & Easy").
- Tags must come from these categories:
    Cuisine   → Italian, Indian, Mexican, Japanese, Mediterranean, Chinese, Thai, American, French
    Meal type → Breakfast, Lunch, Dinner, Snack, Dessert, Appetizer, Side Dish, Brunch
    Method    → Baked, Grilled, Fried, Slow-Cooker, No-Cook, One-Pot, Air-Fryer, Steamed
    Occasion  → Quick & Easy, Meal Prep, Party, Comfort Food, Healthy, Kid-Friendly
    Dietary   → Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto, Low-Carb, High-Protein
- Each tag must be Title Case, 1–3 words, no duplicates.
- DIETARY RULE: Only add a Dietary tag if that word appears in the title itself.
`;

  const call = () =>
    model
      .generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            required: ["tags"],
            properties: {
              tags: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.OBJECT,
                  required: ["name"],
                  properties: { name: { type: SchemaType.STRING } },
                },
              },
            },
          },
        },
      })
      .then((r) => JSON.parse(r.response.text()) as { tags: { name: string }[] });

  return withRetry(call, (r) => Array.isArray(r.tags) && r.tags.length > 0);
};

export interface GeneratedRecipe {
  title: string;
  description: string;
  time_minutes: number;
  tag: { name: string }[];
  ingredient: { name: string }[];
  recipe_procedure: { step: number; title: string; text: string; timer: number }[];
}

export const generateRecipeFromIngredients = async (
  ingredients: string[],
  servings: number,
  cuisine: string,
  dietary: string,
): Promise<GeneratedRecipe> => {
  const prompt = `You are a professional chef, food stylist, and recipe writer.

Ingredients available: ${ingredients.join(", ")}
Servings: ${servings}
${cuisine !== "Any" ? `Cuisine preference: ${cuisine}` : ""}
${dietary !== "None" ? `Dietary requirement: ${dietary}` : ""}

Create a complete recipe using primarily the ingredients listed. Basic pantry staples (salt, pepper, oil, water) may be added.

CRITICAL REQUIREMENTS:

- title: short and appealing recipe name.
- description: 2–3 warm, appetizing sentences.
- time_minutes: realistic total prep + cook time.
- tags: EXACTLY 4–6 tags.
- ingredients: every ingredient with quantity first.
- recipe_procedure: 4–6 numbered steps with title, instructions, and timer.

The image_prompt must accurately represent the final cooked dish and be suitable for an AI image generation model.`

  const call = () =>
    model
      .generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            required: ["title", "description", "time_minutes", "tag", "ingredient", "recipe_procedure"],
            properties: {
              title:        { type: SchemaType.STRING },
              description:  { type: SchemaType.STRING },
              time_minutes: { type: SchemaType.NUMBER },
              tag: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.OBJECT,
                  required: ["name"],
                  properties: { name: { type: SchemaType.STRING } },
                },
              },
              ingredient: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.OBJECT,
                  required: ["name"],
                  properties: { name: { type: SchemaType.STRING } },
                },
              },
              recipe_procedure: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.OBJECT,
                  required: ["step", "title", "text", "timer"],
                  properties: {
                    step:  { type: SchemaType.NUMBER },
                    title: { type: SchemaType.STRING },
                    text:  { type: SchemaType.STRING },
                    timer: { type: SchemaType.NUMBER },
                  },
                },
              },
            },
          },
        },
      })
      .then((r) => JSON.parse(r.response.text()) as GeneratedRecipe);

  return withRetry(
    call,
    (r) =>
      !!r.title &&
      Array.isArray(r.tag) && r.tag.length > 0 &&
      Array.isArray(r.ingredient) && r.ingredient.length > 0 &&
      Array.isArray(r.recipe_procedure) && r.recipe_procedure.length > 0,
  );
};

export const GenerateIngredientQuantity = async (
  title: string,
  servings: number,
): Promise<{ ingredients: { name: string }[] }> => {
  const prompt = `
You are a recipe assistant.

Recipe: "${title}"
Servings: ${servings}

CRITICAL: You MUST return an "ingredients" array with 8 to 12 items. Never return an empty array.

Generate a realistic, complete ingredient list scaled exactly to ${servings} servings.

Rules:
- Each ingredient is a single string with quantity first: "200g spaghetti", "3 tbsp butter", "5 cloves garlic"
- Scale all quantities to ${servings} servings
- Use standard kitchen units: g, ml, tbsp, tsp, cups, cloves, whole, pieces
- Include 8–12 ingredients typical for this dish
`;

  const call = () =>
    model
      .generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            required: ["ingredients"],
            properties: {
              ingredients: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.OBJECT,
                  required: ["name"],
                  properties: { name: { type: SchemaType.STRING } },
                },
              },
            },
          },
        },
      })
      .then(
        (r) =>
          JSON.parse(r.response.text()) as { ingredients: { name: string }[] },
      );

  return withRetry(
    call,
    (r) => Array.isArray(r.ingredients) && r.ingredients.length > 0,
  );
};
