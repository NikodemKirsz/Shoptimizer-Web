import DateOnly from "./DateOnly";
import { ShoppingItem } from "./ShoppingItem";

interface ShoppingList {
  id: number;
  name: string;
  dateCreated: DateOnly;
  archived: boolean;
  shoppingItems: ShoppingItem[];
}

interface ShoppingListPreview extends Omit<ShoppingList,
  "shoppingItems"
> {
  shoppingItemsCount: number;
}

export type { ShoppingList, ShoppingListPreview };