import "./Shopping.css";

export default function Shopping({recipeTitle, servings}: {recipeTitle: string, servings: number}) {
    return (
        <div className="Shopping">
            <div className="selectionContainer">
                <input type="checkbox" id={recipeTitle} />
                <h5>{recipeTitle}</h5>
            </div>
            <span>{servings} servings</span>
        </div>
    )
}