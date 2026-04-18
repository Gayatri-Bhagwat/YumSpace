import { LuCookingPot } from "react-icons/lu";
import "./Recipe.css"
import RecipeCard from "../RecipeCard/RecipeCard";
import { RecipeCardData } from "../../TestData/TestData";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import { PiNotepadFill } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import AddRecipeForm from "../../Forms/AddRecipeForm/AddRecipeForm";
import type { MyFormValues } from "../../Enums/FormFields";

export default function Recipe() {
    const [isVisible, setIsVisible] = useState(false);
    const [recipe, setRecipe] = useState<MyFormValues[]>(RecipeCardData)
    console.log(isVisible)
    return (
        <div className="RecipeSection">
            <div className="RecipeHeader">
                <RecipeDetails icon={LuCookingPot} size={"2rem"} color="e8773d" content={"24 Results Found for Searched Recipe"} />
                <button onClick={() => {
                    setIsVisible(!isVisible)
                }}>
                    <RecipeDetails icon={PiNotepadFill} size={"1.2rem"} color="e8773d" content="Add Recipe" />
                </button>
                <IoMdAdd display="none" size="2.5rem" className="AddButton" />
            </div>
            <div className="RecipeGrid" >
                {recipe.map((recipe) => (
                    <RecipeCard key={recipe.title} item={recipe}
                    />
                ))}
            </div>
            {isVisible && <div className="overlay" onClick={() => setIsVisible(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <AddRecipeForm 
                        recipe={recipe} 
                        setRecipe={setRecipe} 
                        isFormVisible={setIsVisible}
                        formVisible = {isVisible}/>
                </div>
            </div>}
        </div>
    )
}
