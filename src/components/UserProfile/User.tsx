import { PiChefHat } from "react-icons/pi";
import "./User.css"
import { useSelector } from "react-redux";
import type { RootState } from "../../stores/store";
import { useLocation } from "react-router-dom";
export default function UserProfile() {
    const {recipe, filteredRecipeData} = useSelector((state: RootState) => state.addRecipe)
    const {state} = useLocation()
    const recipeToDisplay = filteredRecipeData.length === 0 ? recipe : filteredRecipeData
    return (
        <div className="Parent">

        <div className="UserSection">
            <div className="UserCard">
                <div className="HatContainer">
                    <PiChefHat fontSize={"2.6rem"} color="#e8773d" />
                </div>

                <div className="UserInfo">
                    <span>{state.user_name}</span>
                    <h4>{state.headline}</h4>
                    <div className="TotalRecipeButton">
                        <span>
                            <PiChefHat fontSize={"1.8rem"} color="#e8773d" /> {recipeToDisplay.length} Recipes
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}