import "./Recipe.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import { IoMdAdd } from "react-icons/io";
import AddRecipeForm from "../../Forms/AddRecipeForm/AddRecipeForm";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../stores/store";
import {
  hideRecipeForm,
  showRecipeForm,
} from "../../features/showRecipeForm/showRecipeSlice";
import { FaPlus } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import {
  hideIngredientDialog,
  showIngredientDialog,
} from "../../features/showGenerateIngredients/showGenerateIngredientSlice";
import GenerateIngredientList from "../GenerateIngredientList/GenerateIngredientList";
import { getAllRecipes } from "../../services/APIService";
import { useEffect, useState } from "react";
import {
  setRecipe,
  setUserRecipe,
} from "../../features/addRecipe/addRecipeSlice";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { MyFormValues } from "../../Enums/FormFields";

export default function Recipe() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const { recipe, userRecipe, filteredRecipeData, filteredUserRecipeData, isSearchActive, isUserSearchActive } = useSelector(
    (state: RootState) => state.addRecipe,
  );
  const showBadge = activeTab == "mine" ? true : false

  // Search scope overrides the active tab while a search is running.
  // When no search is active, fall back to whichever tab is selected.
  const recipeToDisplay = (() => {
    if (isSearchActive) return filteredRecipeData ?? [];
    if (isUserSearchActive) return filteredUserRecipeData ?? [];
    return (activeTab === "mine" ? userRecipe : recipe) ?? [];
  })();

  useEffect(() => {
    const setRecipeData = (
      response: Awaited<ReturnType<typeof getAllRecipes>>,
      setterFunction: ActionCreatorWithPayload<MyFormValues[]>,
    ) => {
      if (response.success && response.data) {
        dispatch(setterFunction(response.data));
      }
    };
    const fetchAllRecipes = async () => {
      const [allRecipes, userRecipes] = await Promise.all([
        getAllRecipes({ search: "", active_user: false }, false),
        getAllRecipes({ search: "", active_user: true }, false),
      ]);
      setRecipeData(allRecipes, setRecipe);
      setRecipeData(userRecipes, setUserRecipe);
    };

    fetchAllRecipes();
  }, [dispatch]);
  
  const visible = useSelector((state: RootState) => state.showRecipe.visible);
  const { ingredientVisible } = useSelector(
    (state: RootState) => state.showGenerateIngredient,
  );
  return (
    <div className="RecipeSection">
      <div className="RecipeHeader">
        <div className="RecipeCountHeader">
          <div
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            All Recipes <span>{recipe.length}</span>
          </div>
          <div
            className={activeTab === "mine" ? "active" : ""}
            onClick={() => setActiveTab("mine")}
          >
            My Recipes <span>{userRecipe.length}</span>
          </div>
        </div>
        <div className="ButtonContainer">
          <button
            className="GenerateShoppingListButton"
            onClick={() => {
              dispatch(showIngredientDialog());
            }}
          >
            <RecipeDetails
              icon={IoCartOutline}
              content="Generate Shopping List"
              size="1.4rem"
              color="white"
            />
          </button>
          <button
            onClick={() => {
              dispatch(
                showRecipeForm({
                  visible: !visible,
                  selectedRecipe: null,
                  mode: "add",
                }),
              );
            }}
          >
            <RecipeDetails
              icon={FaPlus}
              size={"1.2rem"}
              color="white"
              content="Add Recipe"
            />
          </button>
          <div className="IconContainer">
            <IoCartOutline
              onClick={() => {
                dispatch(showIngredientDialog());
              }}
              display="none"
              size="2.5rem"
              className="AddButton"
            />
            <IoMdAdd
              onClick={() => {
                dispatch(
                  showRecipeForm({
                    visible: !visible,
                    selectedRecipe: null,
                    mode: "add",
                  }),
                );
              }}
              display="none"
              size="2.5rem"
              className="AddButton"
            />
          </div>
        </div>
      </div>
      <div className="RecipeGrid">
        {recipeToDisplay.length > 0
          ? recipeToDisplay.map((recipe) => (
              <RecipeCard key={recipe.title} item={recipe} showBadge={showBadge}/>
            ))
          : (isSearchActive || isUserSearchActive) && (
              <div className="NoRecipeFound">No recipes found for your search.</div>
            )
        }
      </div>
      {visible && (
        <div className="overlay" onClick={() => dispatch(hideRecipeForm())}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <AddRecipeForm />
          </div>
        </div>
      )}
      {ingredientVisible && (
        <div
          className="overlay"
          onClick={() => dispatch(hideIngredientDialog())}
        >
          <div className="ShoppingModal" onClick={(e) => e.stopPropagation()}>
            <GenerateIngredientList />
          </div>
        </div>
      )}
    </div>
  );
}
