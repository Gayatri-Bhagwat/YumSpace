import { IoIosBook } from "react-icons/io";
import "./Tip.css"
export default function Tip() {
    return (
        <div className="TipClass">
            <div className="TipHeader">
                <span>
                    <IoIosBook color="#e8773d" size={"3rem"} /> Tip of the Day
                </span>
            </div>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing 
            </p>
        </div>
    )
}