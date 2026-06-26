import Filter from "../../components/Filter/Filter";
import GenerateRecipeButton from "../../components/GenerateRecipe/GenerateRecipeButton";
import Header from "../../components/Header/Header";
import Recipe from "../../components/Recipes/Recipe";
import Tag from "../../components/Tag/Tag";
import Tip from "../../components/Tip/Tip";
import UserProfile from "../../components/UserProfile/User";

export default function Main() {

    return (
        <>
            <Header />
            <div className="TopCard">
                <div className="Sidebar">
                    <UserProfile />
                    <Filter />
                    <Tag />
                    <Tip/>
                    <GenerateRecipeButton/>
                </div>
                <div className="RecipeContent">
                    <Recipe />
                </div>
            </div>
        </>
    )
}