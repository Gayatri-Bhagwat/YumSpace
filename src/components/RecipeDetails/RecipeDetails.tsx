import type { IconType } from "react-icons";
import "./RecipeDetails.css"

export default function RecipeDetails({ icon: Icon, content, color, size, fontSize }: {
    icon: IconType,
    content: number | string, color: string, size?: string, fontSize?: number
}) {
    return (
        <div className="RecipeDetail" key={content}>
            {content && <Icon color={color} size={size} />}
            <span style={{ fontSize: `${fontSize}rem`, color: color === 'red' ? 'red' : '' }}>
                {content}
            </span>
        </div>
    );
}