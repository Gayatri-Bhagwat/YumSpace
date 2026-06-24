import { BiSearch } from "react-icons/bi";
import "./Search.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../../services/APIService";
import { searchRecipe, searchUserRecipe, clearSearch } from "../../features/addRecipe/addRecipeSlice";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<"Everyone" | "Mine">(
    "Everyone",
  );
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (search.trim() === "") return;
    const response = await getAllRecipes(
      { search: search.trim(), active_user: activeSearch === "Mine" },
      false,
    );
    if (response.success && response.data) {
      dispatch(
        activeSearch === "Mine"
          ? searchUserRecipe(response.data)
          : searchRecipe(response.data),
      );
    }
  };

  const handleClear = () => {
    dispatch(clearSearch());
  };

  return (
    <div className="SearchContainer">
      <div className="SearchBar">
        <BiSearch size={"1.5rem"} onClick={handleSearch} />
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => {
            if (e.target.value.trim() === "") handleClear();
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <div className="SearchForContainer">
        <button
          className={activeSearch === "Everyone" ? "active" : ""}
          onClick={() => setActiveSearch("Everyone")}
        >
          Everyone
        </button>
        <button
          className={activeSearch === "Mine" ? "active" : ""}
          onClick={() => setActiveSearch("Mine")}
        >
          Mine
        </button>
      </div>
    </div>
  );
}
