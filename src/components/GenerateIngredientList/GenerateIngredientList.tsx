import { IoCartOutline } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import "./GenerateIngredientList.css"
import type { RootState } from "../../stores/store"
import { useDispatch, useSelector } from "react-redux"
import Shopping from "../Shopping/Shopping"
import { RiAiGenerate } from "react-icons/ri"
import RecipeDetails from "../RecipeDetails/RecipeDetails"
import { hideIngredientDialog } from "../../features/showGenerateIngredients/showGenerateIngredientSlice"

export default function GenerateIngredientList() {
    const { recipe } = useSelector((state: RootState) => state.addRecipe)
    const dispatch = useDispatch()
    return (
        <div className="GenerateIngredientList">
            <div className="GenerateIngredientListHeader">
                <div className="CartIconContent">
                    <IoCartOutline className="cartButton" size={"1.5rem"} color="white" />
                    <span>Shopping List</span>
                </div>
                <RxCross2 size="2rem" style={{cursor:"pointer"}} onClick={()=>dispatch(hideIngredientDialog())}/>
            </div>
            <span className="ShoppingListDescription">Select recipes to generate your shopping list</span>
            <div className="RecipeItemList">
                {recipe.map((r) => {
                    return (
                        <Shopping recipeTitle={r.title} servings={r.servings} />
                    );
                })}
            </div>
            <button className="GenerateListButton">
                <RecipeDetails icon={RiAiGenerate} content="Generate Shopping List (3 recipes)" color="white" size="1.2rem"/>
            </button>
        </div>
    )
}