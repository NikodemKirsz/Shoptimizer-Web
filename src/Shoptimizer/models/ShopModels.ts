import { RectDimensions, RectPosition } from "./utility/RectDimensions";

export interface SectionHint {
  category: string;
  items: string[];
} 

export interface ShoppingShop {
  id: string;
  name: string;
  address: string;
  floor: ShopFloor;
}

export interface ShopFloor {
  floorDimensions: RectDimensions;
  shelves: ShopShelf[];
  roads?: ShopRoad[];
  checkouts: ShopCheckout[];
}

export interface ShopShelf extends Positioned {
  id: string;
  sections: ShelfSection[];
}

export interface ShopCheckout extends Positioned {
  id: string;
}

export interface ShopRoad extends Positioned {
  id: string;
}

export interface ShelfSection {
  id: string;
  name: string;
  skip: number;
  size: number;
  items: string[];
}

export interface Positioned {
  dimensions: RectDimensions;
  position: RectPosition;
}