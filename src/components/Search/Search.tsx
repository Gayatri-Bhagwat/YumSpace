import { BiSearch } from "react-icons/bi";
import "./Search.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../../services/APIService";
import { searchRecipe } from "../../features/addRecipe/addRecipeSlice";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const response = await getAllRecipes({search:search}, false);
    if (response.success) {
      dispatch(searchRecipe(response.data));
    }
  };

  return (
    <div className="SearchBar">
      <BiSearch size={"1.5rem"} onClick={handleSearch} />
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => {
          if (e.target.value.trim() === "") {
            dispatch(searchRecipe([]));
          }
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
}
