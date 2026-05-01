import { useLocation } from "react-router-dom";
import RecipeComponents from "../../components/RecipeComponent/RecipeComponent";
import { FaSquareFull, FaUserGroup } from "react-icons/fa6";
import { HiHeart } from "react-icons/hi2";
import "./RecipeDetailPage.css"
import Badge from "../../components/Badge/Badge";
import { PiChefHat } from "react-icons/pi";
import Instruction from "../../components/Instruction/Instruction";
import { BsClockFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { hideDialog, showDialog } from "../../features/showDialogBox/showDialogSlice";
import Dialog from "../../components/Dialog/Dialog";
import type { RootState } from "../../stores/store";

interface Step {
    step: string;
    title: string;
    text: string;
    timeToPrepare: string;
}

export default function RecipeDetailPage() {
    const { state } = useLocation();
    const { visible } = useSelector((state: RootState) => state.showDialog)
    const dispatch = useDispatch()
    return (
        <div className="RecipeInformationCard" key={state.title} onClick={() => visible && dispatch(hideDialog())}>
            <div className="ImageAndTitleContainer" >
                <img src={state.image}></img>
                <button className="DeleteRecipe" onClick={() => {
                    dispatch(showDialog())
                    console.log("dialog shown")
                }}>
                    <MdDelete size="1.7rem" />
                </button>
                <div className="TagListOverImage">
                    {state.tags.map((tag: { name: string }) => {
                        return <Badge content={tag.name} isTag={true} />
                    })}
                </div>
                <h1>{state.title}</h1>
            </div>
            {visible && <div className="DialogContainer">
                <Dialog message="Are you sure you want to delete recipe." />
            </div>}
            <div className="OtherRecipeDetails">
                <RecipeComponents header="Prep Time" value={state.preptime} icon={BsClockFill} />
                <RecipeComponents header="Servings" value={state.servings} icon={FaUserGroup} />
                <RecipeComponents header="Likes" value={state.likes} icon={HiHeart} />
            </div>
            <div className='RecipeDescription' >
                <span className='RecipeDescription'>{state.description}</span>
            </div>
            <div className="InstructionsAndIngredientSection">
                <div className="IngredientSection">
                    <div className="IngredientListHeader" >
                        <PiChefHat size={"2rem"} color="#e8773d" />
                        <span>Ingredients</span>
                    </div>
                    <div className="IngredientList" >
                        {state.ingredients.map((ingredient: { name: string }) => {
                            return <div>
                                <FaSquareFull color="#393939" />
                                <span>{ingredient.name}</span>
                            </div>
                        })}
                    </div>
                </div>
                <div className="StepsToPrepare" >
                    <span className="InstructionsHeader">Instructions</span>
                    {state.stepsToPrepare.map((step: Step) => {
                        return (
                            <Instruction step={step} key={step.step} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}