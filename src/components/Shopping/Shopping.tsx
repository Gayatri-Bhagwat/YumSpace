import type { Dispatch, SetStateAction } from "react";
import "./Shopping.css";

export default function Shopping({
    recipeTitle, servings, setRecipe, recipe }: {
        recipeTitle: string, 
        servings: number, 
        setRecipe: Dispatch<SetStateAction<{ count: number; recipe: string[]; }>>, recipe: { count: number, recipe: string[] }
    }) {
    return (
        <div className="Shopping">
            <div className="selectionContainer">
                <input type="checkbox" id={recipeTitle} onChange={(e) => {
                    if (e.target.checked) {
                        setRecipe({
                            count: recipe.count + 1,
                            recipe: [...recipe.recipe, recipeTitle]
                        })
                    }
                    else {
                        setRecipe({
                            count: recipe.count - 1,
                            recipe: recipe.recipe.filter(item => item != recipeTitle)
                        })
                    }
                }} />
                <h5>{recipeTitle}</h5>
            </div>
            <span>{servings} servings</span>
        </div>
    )
}
