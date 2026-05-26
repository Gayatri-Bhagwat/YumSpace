import type { SelectedGroceryListEnum } from "../../Enums/FormFields";
import type { Category } from "../Grocery/Grocery";
import "./ShoppingPDF.css"

export default function GroceryCategoryPDF({shoppingList}:{shoppingList:SelectedGroceryListEnum}) {
    return <>
        {(Object.entries(shoppingList) as [Category, string[]][]).map(([category, ingredients]) => (
            <div key={category}>
                <h3>{category}</h3>
                {ingredients.map((item) => (
                    <div key={item}>
                        {item}
                    </div>
                ))}
            </div>
        ))})
    </>
}