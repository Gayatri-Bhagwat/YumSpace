import { useSelector } from "react-redux"
import Badge from "../Badge/Badge"
import "./Tag.css"
import type { RootState } from "../../stores/store"

export default function Tag() {
    const {recipe, filteredRecipeData} = useSelector((state: RootState) => state.addRecipe)
    console.log(recipe)
    const recipeToDisplay = filteredRecipeData.length === 0 ? recipe : filteredRecipeData
    const tagList = [...new Set(recipeToDisplay.flatMap((r)=>r.tag.map((t)=>t.name)))]

    return (
        <div className="TagCard">
            <div className="TagHeader">
                <span>Popular Tags</span>
            </div>
            <div className="TagList">
                {tagList.map((tag) => (
                    <Badge content={tag} isTag={true} />
                ))}
            </div>
        </div>
    )
}