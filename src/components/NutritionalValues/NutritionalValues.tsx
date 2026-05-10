import "./NutritionalValues.css"

export default function NutritionalValues({value, element}:{value:number, element:string}) {
    return (
        <div className="NutritionValuecard">
            <span className="Nutritionvalue">{value} g</span>
            <span>{element}</span>
        </div>
    )
}