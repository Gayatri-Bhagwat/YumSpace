import "./Badge.css";

export default function Badge({content, isTag}:{content: string, isTag: boolean}) {
    return (
        <button className={isTag ? "TagBadge" : "IngredientBadge" }>
            {content}
        </button>
    )
}