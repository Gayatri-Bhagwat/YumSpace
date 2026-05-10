import { ImInfo } from "react-icons/im";
import { RiAiGenerate } from "react-icons/ri";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import "./Nutrition.css"
import NutritionalValues from "../NutritionalValues/NutritionalValues";
import NutritionChart from "../NutritionalValues/NutirtionChart";
import type { Nutrition } from "../../Pages/RecipeDetailPage/RecipeDetailPage";



export default function Nutrition({fats, carbs, protein, overall_calories}:Nutrition) {
    return (
        <div className="NutritionalCard">
            <div className="NutritionHeader">
                <div style={{ marginTop: "0.4rem" }}>
                    <RecipeDetails
                        icon={ImInfo}
                        content="Nutritional Info"
                        color="E8521A" />
                </div>
                <div className="GenerateButton">
                    <RecipeDetails
                        icon={RiAiGenerate}
                        content="AI Generated"
                        size="1rem"
                        color="white"
                    />
                </div>
            </div>
            <div className="NutritionDetails">
                <div className="NutritionalValuesDetails">
                    <div className="calories">
                        <span>Per serving</span>
                        <span>{overall_calories} KCal</span>
                    </div>
                    <div className="NutritionValueContainer">
                        <NutritionalValues value={protein} element="Protien" />
                        <NutritionalValues value={carbs} element="Carbs" />
                        <NutritionalValues value={fats} element="Fats" />
                    </div>
                </div>
            </div>
            <NutritionChart protein={protein} carbs={carbs} fats={fats} />

            <p style={{
                fontSize: "11px",
                color: "#888888",
                margin: "0",          // 👈 remove all margin
                paddingLeft: "0.25rem",
            }}>
                * Nutritional values are AI generated and may not be 100% accurate.
            </p>
        </div>
    )
}