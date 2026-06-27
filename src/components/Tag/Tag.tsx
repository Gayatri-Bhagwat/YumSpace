import { useDispatch, useSelector } from "react-redux"
import Badge from "../Badge/Badge"
import "./Tag.css"
import type { RootState } from "../../stores/store"
import { useState } from "react"
import { clearSearch, searchRecipe } from "../../features/addRecipe/addRecipeSlice"

export default function Tag() {
    const dispatch = useDispatch()
    const { recipe } = useSelector((state: RootState) => state.addRecipe)
    const [selectTag, setSelectTag] = useState<string>("")

    const tagList = [...new Set(recipe.flatMap((r) => r.tag.map((t) => t.name)))]

    const handleTagClick = (tag: string) => {
        if (tag === selectTag) {
            setSelectTag("")
            dispatch(clearSearch())
        } else {
            setSelectTag(tag)
            const filtered = recipe.filter((r) => r.tag.some((t) => t.name === tag))
            dispatch(searchRecipe(filtered))
        }
    }

    const handleClear = () => {
        setSelectTag("")
        dispatch(clearSearch())
    }

    return (
        <div className="TagCard">
            <div className="TagHeader">
                <span>Popular Tags</span>
            </div>
            <div className="TagList">
                <button
                    className={`AllPill${selectTag === "" ? " active" : ""}`}
                    onClick={handleClear}
                >
                    All
                </button>
                {tagList.map((tag) => (
                    <Badge
                        key={tag}
                        content={tag}
                        isTag={true}
                        isActive={tag === selectTag}
                        setSelectedTag={handleTagClick}
                    />
                ))}
            </div>
        </div>
    )
}
