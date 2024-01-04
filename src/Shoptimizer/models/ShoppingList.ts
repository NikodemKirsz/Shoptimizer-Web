import DateOnly from "./DateOnly";
import { ShoppingItem } from "./ShoppingItem";

interface ShoppingList {
  id: number;
  name: string;
  dateCreated: string;
  archived: boolean;
  userId: number;
  shoppingItems: ShoppingItem[];
}

interface ShoppingListPreview extends Omit<ShoppingList,
  "shoppingItems"
> {
  itemsCount: number;
}

interface ShoppingListPostDto extends Omit<ShoppingList,
  "id" | "shoppingItems" | "dateCreated"
> {
  dateCreated?: Date;
}

export type { ShoppingList, ShoppingListPreview, ShoppingListPostDto };