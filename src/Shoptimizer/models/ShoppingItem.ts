import { Product } from "./Product";

interface ShoppingItem {
  id: number;
  product: Product;
  count: number;
  shoppingListId: number;
}

interface ShoppingItemPostDto extends Omit<ShoppingItem,
  "id" | "product"
> {
  productId: number;
}

export type { ShoppingItem, ShoppingItemPostDto };