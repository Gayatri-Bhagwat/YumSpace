import type {IconType } from "react-icons";
import "./RecipeDetails.css"

export default function RecipeDetails({icon: Icon, content, color, size}:{icon: IconType, 
    content:number | string, color:string, size?:string}) {
    return (
        <div className="RecipeDetail" key={content}>
            <Icon color={color} size={size}/>
            <span>{content}</span>
        </div>
    );
}