import { PiChefHat } from "react-icons/pi";
import "./User.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../stores/store";
export default function UserProfile() {
  const { recipe, userRecipe } = useSelector(
    (state: RootState) => state.addRecipe,
  );
  const { user_name, headline } = useSelector((state: RootState) => state.user);
  return (
    <div className="Parent">
      <div className="UserSection">
        <div className="UserCard">
          <div className="HatContainer">
            <PiChefHat fontSize={"1.6rem"} color="#e8773d" />
          </div>

          <div className="UserInfo">
            <span>{user_name}</span>
            <h4>{headline}</h4>
            <div className="RecipeCount">
              <div className="TotalRecipeButton">
                <span>🍽️ {recipe.length} total</span>
              </div>
              <div className="TotalRecipeButton">
                <span className="MineRecipeCount">👤 {userRecipe.length} Mine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
