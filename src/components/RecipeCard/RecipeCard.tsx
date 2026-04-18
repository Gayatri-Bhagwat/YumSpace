import { CgLock } from "react-icons/cg";
import { FaUserGroup } from "react-icons/fa6";
import { HiHeart } from "react-icons/hi";
import "./RecipeCard.css"
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import Badge from "../Badge/Badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MyFormValues } from "../../Enums/FormFields";

export interface RecipeTypes {
  title: string;
  description: string;
  tags: { name: string }[]; 
  ingredients: { name: string }[];
  image:string;
  servings:number;
  likes:number;
  preptime:number;
  stepsToPrepare?:{step: number, title:string, text:string, timeToPrepare:number}[];
}
export default function RecipeCard({ item }: { item: MyFormValues }) {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="RecipeCard"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
                navigate(`/recipe/${item.title}`, {state:item})
            }}
        >
            <div className="RecipeInfo">
                <img src={item.image} alt={item.title} className={`RecipeImage`} />
                <span className="RecipeTitle">{item.title}</span>
                <div className="RecipeDetails">
                    <RecipeDetails icon={CgLock} content={item.preptime} color="black"/>
                    <RecipeDetails icon={FaUserGroup} content={item.servings} color="black"/>
                    <RecipeDetails icon={HiHeart} content={item.likes} color="black"/>
                </div>
                <div className="Ingredients">
                    {item.tags.map((tag, index) => (
                        <Badge content={tag.name} key={index} isTag={false} />
                    ))}
                </div>
            </div>
            {hover && <div style={{
                background: "rgba(0,0,0,0.3)",
                color: "white",
                paddingTop: "7rem",
                borderRadius: "10px",
                textAlign: "center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }} >
                Click here to view recipe details
            </div>}
        </div>
    )
}