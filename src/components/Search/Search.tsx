import { BiSearch } from "react-icons/bi";
import "./Search.css"

export default function Search() {
    return (
        <div className="SearchBar">
            <BiSearch size={"1.5rem"}/> 
            <input type="text" placeholder="Search recipes..."  />
        </div>
    )
}