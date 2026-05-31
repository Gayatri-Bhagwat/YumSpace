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
    console.log(search);
    const response = await getAllRecipes({search:search});
    console.log(response.data);
    dispatch(searchRecipe(response.data)); // searchRecipe now correctly refers to the Redux action
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
