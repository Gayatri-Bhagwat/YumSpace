import Badge from "../Badge/Badge"
import "./Tag.css"

export default function Tag() {
    const tagList = ["Healthy", "Vegan", "Dessert", "QuickMeals", "GlutenFree",
        "LowCarb", "HighProtein", "DairyFree", "Paleo", "Keto"]
    return (
        <div className="TagCard">
            <div className="TagHeader">
                <span>Popular Tags</span>
            </div>
            <div className="TagList">
                {tagList.map((tag) => (
                    <Badge key={tag} content={tag} isTag={true} />
                ))}
            </div>
        </div>
    )
}