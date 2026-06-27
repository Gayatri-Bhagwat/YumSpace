import { FaUserGroup } from "react-icons/fa6";
import { HiHeart } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";
import "./RecipeCard.css";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import Badge from "../Badge/Badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MyFormValues } from "../../Enums/FormFields";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { showRecipeForm } from "../../features/showRecipeForm/showRecipeSlice";
import { SlCalender } from "react-icons/sl";
import type { RootState } from "../../stores/store";
import { TfiAlarmClock } from "react-icons/tfi";
import { getPlaceholderEmoji } from "../../services/ClassifyRecipeImage";
import { editExistingRecipe } from "../../services/APIService";
import { editRecipe } from "../../features/addRecipe/addRecipeSlice";

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


  const appendLike = async () => {
    const newLiked = !liked;
    const newCount = Math.max(0, (item.likes ?? 0) + (newLiked ? 1 : -1));
    setLiked(newLiked);
    const response = await editExistingRecipe({ ...item, likes: newCount }, item.id);
    if (response.success) {
      dispatch(editRecipe(response.data));
    } else {
      setLiked(liked);
    }
  };
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
          <div className="RecipeImagePlaceholder">
            {getPlaceholderEmoji(item.tag)}
          </div>
        )}
        <span className="RecipeTitle">{item.title}</span>
        <div className="RecipeDetails">
          <RecipeDetails
            icon={TfiAlarmClock}
            content={`${item.time_minutes} mins`}
            color="black"
            size="1.2rem"
            fontSize={1}
          />
          <RecipeDetails
            icon={FaUserGroup}
            content={`${item.servings} servings`}
            color="black"
            size="1.2rem"
            fontSize={1}
          />
          {item.likes > 0 && (
            <RecipeDetails
              icon={HiHeart}
              content={item.likes}
              color="black"
              size="1.2rem"
              fontSize={1}
            />
          )}
        </div>
        <div className="Ingredients">
          <div className="TagList">
            {item.tag.slice(0, 3).map((tag, index) => (
              <Badge content={tag.name} key={index} isTag={true} />
            ))}
            {item.tag.length > 3 && (
              <Badge content={`+${item.tag.length - 3}`} isTag={true} />
            )}
          </div>
          <div className="CardFooter">
            <RecipeDetails
              icon={SlCalender}
              content={formatDate(item.created_at)}
              color="black"
            />
            <button
              className={`LikeButton${liked ? " liked" : ""}`}
              onMouseEnter={() => setHover(false)}
              onClick={(e) => {
                e.stopPropagation();
                appendLike();
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
            pointerEvents: "none",
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
                pointerEvents: "auto",
                cursor: "pointer",
              }}
            />
          )}
          <div style={{ padding: "8rem 1rem" }}>
            Click here to view recipe details
          </div>
        </div>
      )}
    </div>
  );
}
