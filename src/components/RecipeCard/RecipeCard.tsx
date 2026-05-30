import { CgLock } from "react-icons/cg";
import { FaUserGroup } from "react-icons/fa6";
import { HiHeart } from "react-icons/hi";
import "./RecipeCard.css"
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import Badge from "../Badge/Badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MyFormValues } from "../../Enums/FormFields";
import { MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showRecipeForm } from "../../features/showRecipeForm/showRecipeSlice";
// import { generateNutritionInfo } from "../../services/gemini";

export interface RecipeTypes {
    title: string;
    description: string;
    tag: { name: string }[];
    ingredient: { name: string }[];
    image: string;
    servings: number;
    likes: number;
    time_minutes: number;
    recipe_procedure?: { step: number, title: string, text: string, timer: number }[];
}


export default function RecipeCard({ item }: { item: MyFormValues }) {
    const [hover, setHover] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="RecipeCard"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
                navigate(`/recipe/${item.title}`, { state: item })
            }}
        >
            <div className="RecipeInfo">
                <img src={item.image?.toString()} alt={item.title} className={`RecipeImage`} />
                <span className="RecipeTitle">{item.title}</span>
                <div className="RecipeDetails">
                    <RecipeDetails icon={CgLock} content={`${item.time_minutes} mins`} color="black" />
                    <RecipeDetails icon={FaUserGroup} content={`${item.servings} servings`} color="black" />
                    <RecipeDetails icon={HiHeart} content={item.likes} color="black" />
                </div>
                <div className="Ingredients">
                    {item.tag.map((tag, index) => (
                        <Badge content={tag.name} key={index} isTag={false} />
                    ))}
                </div>
            </div>
            {hover && <div style={{
                color: "white",
                borderRadius: "10px",
                textAlign: "center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.5))", // ✅ gradient background
            }}>
                <MdModeEdit onClick={(e) => {
                    e.stopPropagation()
                    dispatch(showRecipeForm({ visible: true, selectedRecipe: item, mode: "edit" }))
                }} size="1.6rem" style={{
                    position: "absolute",
                    top: "20px",
                    right: "30px",
                }} />

                <div style={{
                    paddingTop: "7rem",
                }}>
                    Click here to view recipe details
                </div>
            </div>}
        </div>
    )
}