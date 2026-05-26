import { Document, Page, View } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import type { RootState } from "../../stores/store";
import GroceryCategoryPDF from "./GroceryCategory";

export default function ShoppingListPDF() {

    const shoppingList = useSelector((state: RootState) => state.addIngredients.groceryData)
    return (
        <Document>
            <Page size="A4">
                <h2 className="GrocerypdfHeader">Grocery List</h2>
                <div className="GroceryGridPDF">
                    <View>
                        <GroceryCategoryPDF shoppingList={shoppingList}/>
                    </View>
                </div>
            </Page>
        </Document>
    )
}