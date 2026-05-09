import { useState } from "react"
import type { Ingredient } from "../../RecipeSelectionList/RecipeSelectionList"
import "../Grocery/Grocery.css"

type Category = "Dairy and Eggs" | "Meat" | "Pantry" | "Vegetables"



type GroceryList = Record<Category, Ingredient[]>
export default function GroceryList({ groceryList }: {
  groceryList: GroceryList
}) {
  const [checked, setChecked] = useState<string[]>([])

const handleCheck = (name: string) => {
  setChecked(prev =>
    prev.includes(name)
      ? prev.filter(n => n !== name) 
      : [...prev, name]             
  )
}
  return <div className="grid">
    {(Object.entries(groceryList) as [Category, Ingredient[]][]).map(
      ([category, ingredients]) => (
        <div key={category}>
          <div className="cat-label">{category.toUpperCase()}</div>
          {ingredients.map((ingredient) => (
            <div className={`ingredient-card ${checked.includes(ingredient.name) ? 'checked' : ''}`} key={ingredient.name}>
              <input type="checkbox" className="checkbox" onChange={() => handleCheck(ingredient.name)} />
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

