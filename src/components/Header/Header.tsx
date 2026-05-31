import { PiChefHat } from "react-icons/pi"
import "./HeaderStyles.css"
import Search from "../Search/Search"
import { useSelector } from "react-redux"
import type { RootState } from "../../stores/store"

export default function Header() {
    const { recipe } = useSelector((state: RootState) => state.addRecipe)
    return (
        <div className="topHeader">
            <div className="HeaderCard">
                <div className="Header">
                    <div style={{ fontSize: `24px`, alignItems: "center", display: "flex", gap: "0.5rem", margin: "0.5rem 0rem 0rem 0.5rem" }}>
                        <PiChefHat className="HatIcon" fontSize={`2.5rem`} color="#e8773d" />
                        <span>
                            YumSpace
                        </span>
                    </div>
                </div>
                <div className="Search">
                    <Search />
                </div>
                <span className="TotalRecipesFound">{recipe.length} Recipes Found</span>
            </div>
            <hr style={{ border: "0.1px solid #eee9e9" }}></hr>
        </div>
    )
}