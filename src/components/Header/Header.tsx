import { PiChefHat } from "react-icons/pi"
import "./HeaderStyles.css"
import Search from "../Search/Search"
import { useSelector } from "react-redux"
import type { RootState } from "../../stores/store"

export default function Header() {
    const { recipe , filteredRecipeData} = useSelector((state: RootState) => state.addRecipe)
    const recipeToDisplay = filteredRecipeData.length === 0 ? recipe : filteredRecipeData
    return (
        <div className="topHeader">
            <div className="HeaderCard">
                <div className="Header">
                    <div className="LogoText">
                        <PiChefHat className="HatIcon" fontSize="2.2rem" color="#e8773d" />
                        <span>YumSpace</span>
                    </div>
                </div>
                <div className="Search">
                    <Search />
                </div>
                <span className="TotalRecipesFound">{recipeToDisplay.length} Recipes Found</span>
            </div>
        </div>
    )
}