import { CgLock } from "react-icons/cg";
import { FaUserGroup } from "react-icons/fa6";
import { HiHeart } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";
import "./RecipeCard.css";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MyFormValues } from "../../Enums/FormFields";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { showRecipeForm } from "../../features/showRecipeForm/showRecipeSlice";
import { SlCalender } from "react-icons/sl";
import type { RootState } from "../../stores/store";

export interface RecipeTypes {
  title: string;
  description: string;
  tag: { name: string }[];
  ingredient: { name: string }[];
  image: string;
  servings: number;
  likes: number;
  time_minutes: number;
  recipe_procedure?: {
    step: number;
    title: string;
    text: string;
    timer: number;
  }[];
  created_at: string;
}

export default function RecipeCard({
  item,
  showBadge,
}: {
  item: MyFormValues;
  showBadge: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const { userRecipe } = useSelector((state: RootState) => state.addRecipe);
  const isMyRecipe = (userRecipe ?? []).some((r) => r.id === item.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (created_at: string) => {
    return new Date(created_at).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const likeCount = (item.likes ?? 0) + (liked ? 1 : 0);

  return (
    <div
      className="RecipeCard"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        navigate(`/recipe/${item.title}`, { state: item });
      }}
    >
      {isMyRecipe && !showBadge && (
        <div className="MyRecipeBadge">✦ My Recipe</div>
      )}
      <div className="RecipeInfo">
        {item.image ? (
          <img
            src={item.image.toString()}
            alt={item.title}
            className="RecipeImage"
          />
        ) : (
          <div className="RecipeImagePlaceholder">🍽️</div>
        )}
        <span className="RecipeTitle">{item.title}</span>
        <div className="RecipeDetails">
          <RecipeDetails
            icon={CgLock}
            content={`${item.time_minutes} mins`}
            color="black"
          />
          <RecipeDetails
            icon={FaUserGroup}
            content={`${item.servings} servings`}
            color="black"
          />
          {likeCount > 0 && (
            <RecipeDetails
              icon={HiHeart}
              content={likeCount}
              color={liked ? "#e8521a" : "black"}
            />
          )}
        </div>
        <div className="Ingredients">
          <div className="CardFooter">
            <RecipeDetails
              icon={SlCalender}
              content={formatDate(item.created_at)}
              color="black"
            />
            <button
              className={`LikeButton${liked ? " liked" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setLiked((prev) => !prev);
              }}
            >
              {liked ? (
                <HiHeart size="1.25rem" color="#e8521a" />
              ) : (
                <CiHeart size="1.25rem" />
              )}
            </button>
          </div>
        </div>
      </div>
      {hover && (
        <div
          style={{
            color: "white",
            borderRadius: "10px",
            textAlign: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.5))",
          }}
        >
          {isMyRecipe && (
            <MdModeEdit
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  showRecipeForm({
                    visible: true,
                    selectedRecipe: item,
                    mode: "edit",
                  }),
                );
              }}
              size="1.6rem"
              style={{
                position: "absolute",
                top: "20px",
                right: "30px",
              }}
            />
          )}
          <div style={{ padding: "6rem 1rem" }}>
            Click here to view recipe details
          </div>
        </div>
      )}
    </div>
  );
}
