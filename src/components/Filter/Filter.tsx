import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import "./Filter.css";
import { useState } from "react";
import DropDown from "../DropDown/DropDown";
import { getAllRecipes } from "../../services/APIService";
import { useDispatch, useSelector } from "react-redux";
import { searchRecipe } from "../../features/addRecipe/addRecipeSlice";
import type { RootState } from "../../stores/store";
import type { MyFormValues } from "../../Enums/FormFields";


export default function Filter() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    sort: "Newest",
    prepTime: "All times",
  });

  const { recipe, filteredRecipeData } = useSelector(
    (state: RootState) => state.addRecipe,
  );

  const recipeToDisplay =
    filteredRecipeData.length === 0 ? recipe : filteredRecipeData;

  const dropDownOptions = () => {
    const availableDropDownOptions: string[] = ["All times"];
    recipeToDisplay.forEach((r) => {
      if (
        r.time_minutes <= 30 &&
        !availableDropDownOptions.includes("Under 30 minutes")
      ) {
        availableDropDownOptions.push("Under 30 minutes");
      } else if (
        r.time_minutes > 30 &&
        r.time_minutes <= 60 &&
        !availableDropDownOptions.includes("30-60 minutes")
      ) {
        availableDropDownOptions.push("30-60 minutes");
      } else if (
        r.time_minutes > 60 &&
        !availableDropDownOptions.includes("Over 60 minutes")
      ) {
        availableDropDownOptions.push("Over 60 minutes");
      }
    });
    return availableDropDownOptions;
  };

  const sortMapping: Record<string, string> = {
    Newest: "desc",
    Oldest: "asc",
  };

  const prepTimeMapping: Record<string, string> = {
    "All times": "all",
    "Under 30 minutes": "30",
    "30-60 minutes": "60",
    "Over 60 minutes": "90",
  };

  const sortedRecipes = (
    recipes: MyFormValues[],
    filter: Record<string, string>,
  ) =>
    [...recipes].sort((a, b) => {
      if (filter["sort_by"] === "desc") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }
    });

  const filterByPrepTime = (
    recipes: MyFormValues[],
    filter: Record<string, string>,
  ) => {
    if (filter["prep_time"] === "all") {
      return recipes;
    } else if (filter["prep_time"] === "30") {
      return recipes.filter((recipe) => recipe.time_minutes <= 30);
    } else if (filter["prep_time"] === "60") {
      return recipes.filter(
        (recipe) => recipe.time_minutes > 30 && recipe.time_minutes <= 60,
      );
    } else if (filter["prep_time"] === "90") {
      return recipes.filter((recipe) => recipe.time_minutes > 60);
    }
    return recipes;
  };

  const handleFilters = async (key: string, value: string | number) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    console.log(updated);

    const filter: Record<string, string> = {
      sort_by: sortMapping[updated.sort],
      prep_time: prepTimeMapping[updated.prepTime],
    };

    if (filteredRecipeData.length > 0) {
      const sorted = sortedRecipes(filteredRecipeData, filter);
      const result = filterByPrepTime(sorted, filter);
      dispatch(searchRecipe(result));
    } else {
      const response = await getAllRecipes(filter, false);
      dispatch(searchRecipe(response.data));
    }
  };

  const clearButton = () => {
    dispatch(searchRecipe(recipe));
    setFilters({ sort: "Newest", prepTime: "All times" });
  };

  return (
    <div className="FilterCard">
      <div className="FilterHeader">
        <span>
          <HiAdjustmentsHorizontal color="#e8773d" size={"2rem"} /> Filters
        </span>
      </div>
      <div className="FilterCategory">
        <h4>Sort By</h4>
        <DropDown
          selectOptions={["Newest", "Oldest"]}
          value={filters.sort}
          className="FilterOptions"
          onChange={(value) => handleFilters("sort", value)}
        />
        <h4>Prep Time</h4>
        <DropDown
          selectOptions={dropDownOptions()}
          value={filters.prepTime}
          className="FilterOptions"
          onChange={(value) => handleFilters("prepTime", value)}
        />
      </div>
      <button className="clearFilters" onClick={clearButton}>
        Clear Filters
      </button>
    </div>
  );
}
