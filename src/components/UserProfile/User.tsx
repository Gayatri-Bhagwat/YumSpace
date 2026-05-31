import { PiChefHat } from "react-icons/pi";
import "./User.css"
import { useSelector } from "react-redux";
import type { RootState } from "../../stores/store";
export default function UserProfile() {
    const {recipe, filteredRecipeData} = useSelector((state: RootState) => state.addRecipe)
    const recipeToDisplay = filteredRecipeData.length === 0 ? recipe : filteredRecipeData
    return (
        <div className="Parent">

        <div className="UserSection">
            <div className="UserCard">
                <div className="HatContainer">
                    <PiChefHat fontSize={"3rem"} color="#e8773d" />
                </div>

                <div className="UserInfo">
                    <span>Gayatri Bhagwat</span>
                    <h4>Food enthusiast & home chef 
                        sharing delicious recipes Lorem ipsum dolor sit 
                        amet consectetur adipisicing elit.</h4>
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