import { IoCartOutline } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import "./GenerateIngredientList.css"
import type { RootState } from "../../stores/store"
import { useDispatch, useSelector } from "react-redux"
import { hideIngredientDialog } from "../../features/showGenerateIngredients/showGenerateIngredientSlice"
import { useState } from "react"
import RecipeSelectionList from "../../RecipeSelectionList/RecipeSelectionList"

interface props {
    count: number;
    recipe: string[]
}
const initialSelectedRecipe: props = {
    count: 0,
    recipe: []
}

export default function GenerateIngredientList() {
    const [selectedRecipe, setSelectedRecipe] = useState(initialSelectedRecipe)
    const { recipe, filteredRecipeData } = useSelector((state: RootState) => state.addRecipe)
    const dispatch = useDispatch()
    const recipeToDisplay = filteredRecipeData.length === 0 ? recipe : filteredRecipeData
    return (
        <div className="GenerateIngredientList">
            <div className="GenerateIngredientListHeader">
                <div className="CartIconContent">
                    <IoCartOutline className="cartButton" size={"1.5rem"} color="white" />
                    <span>Shopping List</span>
                </div>
                <RxCross2 size="2rem" style={{ cursor: "pointer" }} onClick={() => dispatch(hideIngredientDialog())} />
            </div>
            <RecipeSelectionList recipe={recipeToDisplay} selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} />

        </div>
    )
}