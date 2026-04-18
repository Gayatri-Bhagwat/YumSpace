import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import "./Filter.css"
import DropDown from "../DropDown/DropDown";
export default function Filter(){
    return (
        <div className="FilterCard">
            <div className="FilterHeader">
                <span>
                    <HiAdjustmentsHorizontal color="#e8773d" size={"2rem"} /> Filters
                </span>
            </div>
            <div className="FilterCategory">
                <h4>Sort By</h4>
                <DropDown selectOptions={["Newest", "Oldest", "Most Popular"]}/>
                <h4>Prep Time</h4>
                <DropDown selectOptions={["All times", "Under 30 minutes", "30-60 minutes", "Over 60 minutes"]}/>
            </div>
        </div>
    )
}