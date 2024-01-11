import { RectDimensions, RectPosition } from "./utility/RectDimensions";

export interface ShopPreview extends Omit<ShoppingShop,
  "floor"
> {
}

export interface ShoppingShop {
  id: string;
  name: string;
  address: string;
  floor: ShopFloor;
}

export interface ShopFloor {
  dimensions: RectDimensions;
  shelves: ShopShelf[];
  roads: ShopRoad[];
  checkouts: ShopCheckout[];
}

export interface ShopShelf extends Positioned {
  number: number;
  sections: ShelfSection[];
}

export interface ShopCheckout extends Positioned {
  number: number;
}

export interface ShopRoad extends Positioned {
  number: number;
}

export interface ShelfSection {
  number: number;
  skip: number;
  size: number;
  categoryName: string;
  shoppingProducts: ShoppingProduct[];
}

export interface ShoppingProduct {
  id: number;
  name: string;
}

export interface Positioned {
  dimensions: RectDimensions;
  position: RectPosition;
}