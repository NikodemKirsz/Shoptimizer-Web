import DateOnly from "./DateOnly";
import { ShoppingItem } from "./ShoppingItem";
import { ShopPreview } from "./ShopModels";

interface ShoppingList {
  id: number;
  name: string;
  dateCreated: string;
  archived: boolean;
  userId: number;
  shopId: string;
  shoppingItems: ShoppingItem[];
}

interface ShoppingListPreview extends Omit<ShoppingList,
  "shoppingItems"
> {
  itemsCount: number;
  shopPreview: ShopPreview;
}

interface ShoppingListPostDto extends Omit<ShoppingList,
  "id" | "shoppingItems" | "dateCreated"
> {
  dateCreated?: Date;
}

export type { ShoppingList, ShoppingListPreview, ShoppingListPostDto };