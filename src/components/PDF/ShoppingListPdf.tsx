import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  type GroceryList,
  type Ingredient,
} from "../../RecipeSelectionList/RecipeSelectionList";

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#f8fafc" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e293b",
  },
  category: { marginBottom: 16 },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff6b35",
    marginBottom: 6,
    padding: 6,
    backgroundColor: "#e0e7ff",
  },
  item: {
    fontSize: 11,
    color: "#334155",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
});

type Props = {
  groceryList: GroceryList;
};

export const ShoppingListPDF = ({ groceryList }: Props) => {
  console.log(groceryList, "PFF")
  return (
    <Document>
      <Page size="A4" style={styles.page}>
          <Text style={styles.title}>
            Shopping List
          </Text>

          {(
            Object.entries(groceryList) as [keyof GroceryList, Ingredient[]][]
          ).map(
            ([category, ingredients]) =>
              ingredients.length > 0 && ( // ✅ only show categories with items
                <View key={category} style={styles.category}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  {ingredients.map((item, index) => (
                    <Text key={index} style={styles.item}>
                      • {item.name}
                    </Text>
                  ))}
                </View>
              ),
          )}
      </Page>
    </Document>
  );
};
