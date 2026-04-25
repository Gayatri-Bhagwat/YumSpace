import { LuCookingPot } from "react-icons/lu";
import "./Recipe.css"
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import { PiNotepadFill } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import AddRecipeForm from "../../Forms/AddRecipeForm/AddRecipeForm";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../stores/store"
import { hideRecipeForm, showRecipeForm } from "../../features/showRecipeForm/showRecipeSlice";

export default function Recipe() {

    const recipes = useSelector((state:RootState) => state.addRecipe.recipe)
    const visible = useSelector((state:RootState) => state.showRecipe.visible)
    const dispatch = useDispatch()
    return (
        <div className="RecipeSection">
            <div className="RecipeHeader">
                <RecipeDetails icon={LuCookingPot} size={"2rem"} color="e8773d" content={"24 Results Found for Searched Recipe"} />
                <button onClick={() => {
                    dispatch(showRecipeForm({visible: !visible, selectedRecipe:null, mode:'add'}))
                }}>
                    <RecipeDetails icon={PiNotepadFill} size={"1.2rem"} color="e8773d" content="Add Recipe" />
                </button>
                <IoMdAdd display="none" size="2.5rem" className="AddButton" />
            </div>
            <div className="RecipeGrid" >
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.title} item={recipe}
                    />
                ))}
            </div>
            {visible && <div className="overlay" onClick={()=>dispatch(hideRecipeForm())}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <AddRecipeForm  />
                </div>
            </div>}
        </div>
    )
}
