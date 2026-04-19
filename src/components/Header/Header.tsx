import { PiChefHat } from "react-icons/pi"
import "./HeaderStyles.css"
import Search from "../Search/Search"

export default function Header() {
    return (
        <>
            <div className="HeaderCard">
                <div className="Header">
                    <div style={{ fontSize: `24px`, alignItems: "center", display: "flex", gap: "0.5rem", margin: "0.5rem 0rem 0rem 0.5rem" }}>
                        <PiChefHat className="HatIcon" fontSize={`2.5rem`} color="#e8773d" />
                        <span>
                            YumSpace
                        </span>
                    </div>
                </div>
                <div className="Search">
                    <Search />
                </div>
                <span className="TotalRecipesFound">24 Recipes Found</span>
            </div>
            <hr style={{ border: "0.1px solid #eee9e9" }}></hr>
        </>
    )
}