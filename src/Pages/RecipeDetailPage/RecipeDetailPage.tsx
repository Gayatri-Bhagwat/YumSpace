import { useLocation } from "react-router-dom";
import RecipeComponents from "../../components/RecipeComponent/RecipeComponent";
import { FaSquareFull, FaUserGroup } from "react-icons/fa6";
import { HiFire, HiHeart } from "react-icons/hi2";
import "./RecipeDetailPage.css";
import Badge from "../../components/Badge/Badge";
import { PiChefHat } from "react-icons/pi";
import Instruction from "../../components/Instruction/Instruction";
import { BsClockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  hideDialog,
  showDialog,
} from "../../features/showDialogBox/showDialogSlice";
import Dialog from "../../components/Dialog/Dialog";
import type { RootState } from "../../stores/store";
import { RiDeleteBinLine } from "react-icons/ri";
import Nutrition from "../../components/NutritionalDetails/Nutrition";
import { generateNutritionInfo } from "../../services/gemini";
import { useState } from "react";
import { IoMdNutrition } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Step {
  step: string;
  title: string;
  text: string;
  timer: string;
}
export interface Nutrition {
  fats: number;
  carbs: number;
  protein: number;
  overall_calories: number;
}

const initialNutritionData: Nutrition = {
  fats: 0,
  carbs: 0,
  protein: 0,
  overall_calories: 0,
};
export default function RecipeDetailPage() {
  const { state } = useLocation();
  const [nutritionInfo, setNutritionInfo] = useState(initialNutritionData);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [loadNutritionInfo, setLoadNutritionInfo] = useState(true);
  const { visible } = useSelector((state: RootState) => state.showDialog);
  const dispatch = useDispatch();
  return (
    <div
      className="RecipeInformationCard"
      key={state.title}
      onClick={() => visible && dispatch(hideDialog())}
    >
      <div className="RecipePageContent">
        <div className="ImageAndTitleContainer">
          {state.image ? (
            <img
              src={state.image.toString()}
              alt={state.title}
              className="RecipeImage"
            />
          ) : (
            <div className="RecipeImagePlaceholderDetailPage">🍽️</div>
          )}
          <button
            className="Nutritioninfo"
            onClick={async () => {
              try {
                setLoadNutritionInfo(true);
                setShowSkeleton(true);
                const data = await generateNutritionInfo(state);
                setNutritionInfo(data);
              } catch (error) {
                console.error("AI Error:", error);
              } finally {
                setLoadNutritionInfo(false);
                setShowSkeleton(false);
              }
            }}
          >
            <IoMdNutrition size="1.8rem" />
          </button>
          <button
            className="DeleteRecipe"
            onClick={() => dispatch(showDialog())}
          >
            <RiDeleteBinLine size="1.8rem" />
          </button>
        </div>

        <div className="RecipeHeaderSection">
          <h1 className="RecipeMainTitle">{state.title}</h1>
          <div className="TagListBelowImage">
            {state.tag.map((tag: { name: string }) => (
              <Badge content={tag.name} isTag={true} />
            ))}
          </div>
        </div>

        <div className="OtherRecipeDetails">
          <RecipeComponents
            header="Prep Time"
            value={state.time_minutes}
            icon={BsClockFill}
          />
          <RecipeComponents
            header="Servings"
            value={state.servings}
            icon={FaUserGroup}
          />
          <RecipeComponents header="Likes" value={state.likes} icon={HiHeart} />
          {!loadNutritionInfo && (
            <RecipeComponents
              header="Calories"
              value={nutritionInfo.overall_calories}
              icon={HiFire}
            />
          )}
        </div>

        <p className="RecipeDescription">{state.description}</p>

        <hr className="RecipeDivider" />

        <div className="InstructionsAndIngredientSection">
          <div className="IngredientSection">
            <div className="IngredientListHeader">
              <PiChefHat size={"1.4rem"} color="#e8773d" />
              <span>Ingredients</span>
            </div>
            <div className="IngredientList">
              {state.ingredient.map((ingredient: { name: string }) => (
                <div>
                  <FaSquareFull color="#e8773d" size="0.45rem" />
                  <span>{ingredient.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="StepsToPrepare">
            <span className="InstructionsHeader">Instructions</span>
            {state.recipe_procedure.map((step: Step) => (
              <Instruction step={step} key={step.step} />
            ))}
          </div>
        </div>

        <div className="NutritionContainer">
          {showSkeleton && (
            <div
              style={{
                display: "flex",
                borderRadius: "16px",
                padding: "1rem 1.25rem",
                width: "66rem",
                overflow: "hidden",
              }}
            >
              <Skeleton
                count={4}
                height={40}
                baseColor="#f0e6dc"
                highlightColor="#faf0e8"
                borderRadius="12px"
                containerClassName="skeleton-container"
              />
            </div>
          )}
          {!loadNutritionInfo && (
            <Nutrition
              fats={nutritionInfo.fats}
              protein={nutritionInfo.protein}
              carbs={nutritionInfo.carbs}
              overall_calories={nutritionInfo.overall_calories}
            />
          )}
        </div>
      </div>

      {visible && (
        <div className="DialogContainer">
          <Dialog message="Are you sure you want to delete" recipe={state} />
        </div>
      )}
    </div>
  );
}
