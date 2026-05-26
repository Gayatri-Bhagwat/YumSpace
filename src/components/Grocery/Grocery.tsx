import { useState } from "react"
import type { Ingredient } from "../../Enums/FormFields"
import "../Grocery/Grocery.css"
import { useDispatch } from "react-redux"
import { addIngredient } from "../../features/addIngredientsToList/addIngredientsToList"

export type Category = "Dairy and Eggs" | "Meat" | "Pantry" | "Vegetables"



type GroceryList = Record<Category, Ingredient[]>
export default function GroceryList({ groceryList }: {
  groceryList: GroceryList
}) {
  const [checked, setChecked] = useState<string[]>([])
  const dispatch = useDispatch()

const handleCheck = (category: Category, name: string) => {
  setChecked(prev =>
    prev.includes(name)
      ? prev.filter(n => n !== name) 
      : [...prev, name]             
  )
  dispatch(addIngredient({category:category, ingredient:name}));
}
  return <div className="grid">
    {(Object.entries(groceryList) as [Category, Ingredient[]][]).map(
      ([category, ingredients]) => (
        <div key={category}>
          <div className="cat-label">{category.toUpperCase()}</div>
          {ingredients.map((ingredient) => (
            <div className={`ingredient-card ${checked.includes(ingredient.name) ? 'checked' : ''}`} key={ingredient.name}>
              <input type="checkbox" className="checkbox" onChange={() => handleCheck(category, ingredient.name)} />
              <div className="ing-info">
                <div className='ing-name'>{ingredient.name}</div>
                <div className="ing-recipes">
                  <span>{ingredient.recipe.join(", ")}</span>
                </div>
              </div>
              <div className="ing-qty">{ingredient.quantity}</div>
            </div>
          ))}
        </div>
      )
    )}
  </div>
}

