import { Product } from "./Product";

interface ShoppingItem {
  id: number;
  product: Product;
  count: number;
}

export type { ShoppingItem };