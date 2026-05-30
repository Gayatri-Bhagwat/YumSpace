import { useState, type Dispatch, type SetStateAction } from "react";
import Shopping from "../components/Shopping/Shopping";
import type { MyFormValues } from "../Enums/FormFields";
import RecipeDetails from "../components/RecipeDetails/RecipeDetails";
import { RiAiGenerate } from "react-icons/ri";
import "./RecipeSelectionList.css";
import { generateGroceryList } from "../services/gemini";
import { IoPrintSharp } from "react-icons/io5";
import GroceryList from "../components/Grocery/Grocery";
import { ShoppingListPDF } from "../components/PDF/ShoppingListPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

export type Ingredient = {
  name: string;
  recipe: string[];
  quantity: number;
};

export type GroceryList = {
  "Dairy and Eggs": Ingredient[];
  Meat: Ingredient[];
  Pantry: Ingredient[];
  Vegetables: Ingredient[];
};

const initialShoppingData: GroceryList = {
  "Dairy and Eggs": [],
  Meat: [],
  Pantry: [],
  Vegetables: [],
};

export default function RecipeSelectionList({
  recipe,
  setSelectedRecipe,
  selectedRecipe,
}: {
  recipe: MyFormValues[];
  setSelectedRecipe: Dispatch<
    SetStateAction<{ count: number; recipe: string[] }>
  >;
  selectedRecipe: {
    count: number;
    recipe: string[];
  };
}) {
  const [generatedShoppingList, setGeneratedShoppingList] =
    useState(initialShoppingData);
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const shoppingList = async () => {
    if (selectedRecipe.count != 0) {
      try {
        setLoading(true);
        const data = await generateGroceryList(selectedRecipe.recipe);
        setGeneratedShoppingList(data);
        setIsFetched(true);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {!isFetched ? (
        <>
          <span className="ShoppingListDescription">
            Select recipes to generate your shopping list
          </span>
          <div className="RecipeItemList">
            {recipe.map((r) => (
              <Shopping
                key={r.title}
                recipeTitle={r.title}
                servings={r.servings}
                setRecipe={setSelectedRecipe}
                recipe={selectedRecipe}
              />
            ))}
          </div>
          <button
            className="GenerateListButton"
            onClick={shoppingList}
            disabled={loading}
          >
            <RecipeDetails
              icon={RiAiGenerate}
              content={
                loading
                  ? "Generating with AI..."
                  : `Generate Shopping List (${selectedRecipe.count} recipes)`
              }
              color="white"
              size="1.2rem"
            />
          </button>
        </>
      ) : (
        <div>
          <div className="groceryListHeader">
            <div className="GenerateListButton">
              <RecipeDetails
                icon={RiAiGenerate}
                content={`AI Generated - ${selectedRecipe.count} recipes`}
                color="white"
                size="1.2rem"
              />
            </div>

              <PDFDownloadLink
                document={
                  <ShoppingListPDF groceryList={generatedShoppingList} />
                }
                fileName="shopping-list.pdf"
                style={{ textDecoration: "none" }}
              >
                {({ loading: pdfLoading }) => (
                  <button
                  className="GenerateListButton"
                    style={{
                      outline: "none",
                      border: "none",
                      fontSize: "18px",
                      width: "26rem",
                      height:"3rem",
                      borderRadius:"0.5rem",
                      color: "white",
                      cursor: "pointer",
                      backgroundColor: "#ff6b35",
                    }}
                  >
                    <RecipeDetails
                      icon={IoPrintSharp}
                      content={
                        pdfLoading ? "Preparing PDF..." : "Print Shopping List"
                      }
                      color="white"
                      size="1.2rem"
                    />
                  </button>
                )}
              </PDFDownloadLink>
          </div>

          <GroceryList groceryList={generatedShoppingList} />

          <div className="groceryListHeader">
            <button
              onClick={() => {
                setSelectedRecipe({ count: 0, recipe: [] });
                setIsFetched(false);
              }}
              className="GenerateListButton startOverButton"
            >
              <span>Start Over</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
