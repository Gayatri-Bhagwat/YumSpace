import { useSelector } from "react-redux"
import Badge from "../Badge/Badge"
import "./Tag.css"
import type { RootState } from "../../stores/store"

export default function Tag() {
    const {recipe} = useSelector((state: RootState) => state.addRecipe)
    console.log(recipe)
    const tagList = [...new Set(recipe.flatMap((r)=>r.tag.map((t)=>t.name)))]

    console.log(tagList,"tags")
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