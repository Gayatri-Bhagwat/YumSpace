import { LuCookingPot } from "react-icons/lu";
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
import { useEffect } from "react";
import { setRecipe } from "../../features/addRecipe/addRecipeSlice";

export default function Recipe() {
  const dispatch = useDispatch();
  const { recipe, filteredRecipeData } = useSelector(
    (state: RootState) => state.addRecipe,
  );
  const recipeToDisplay =
    filteredRecipeData.length === 0 ? recipe : filteredRecipeData;
  useEffect(() => {
    const fetchAllRecipes = async () => {
      const response = await getAllRecipes({search:""}, true);

      if (response.success && response.data) {
        // ASSIGNMENT HAPPENS HERE:
        // response.data is the MyFormValues[] array sent to your reducer
        dispatch(setRecipe(response.data));
      }
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
        <RecipeDetails
          icon={LuCookingPot}
          size={"2rem"}
          color="e8773d"
          content={`${recipeToDisplay.length} Results Found for Searched Recipe`}
        />
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
        {recipeToDisplay.map((recipe) => (
          <RecipeCard key={recipe.title} item={recipe} />
        ))}
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
