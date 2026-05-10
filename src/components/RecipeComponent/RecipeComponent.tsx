import type { IconType } from "react-icons"
import "./RecipeComponent.css"
export default function RecipeComponents({ icon: Icon, header, value }: {
    icon: IconType,
    header: string,
    value: number
}) {
    return (
        <div className="RecipeDetailComponents">
            <div className="InnerWrapper">
                <div className="RecipeDetailIcon">
                    <Icon size={"1.2rem"} color="#e8773d" />
                </div>

                <div className="KeyValues">
                    <span className="KeyHeader">{header}</span>
                    <span className="KeyValue">{value}</span>
                </div>

            </div>
        </div>
    )
}