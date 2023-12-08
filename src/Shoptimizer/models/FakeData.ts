import { ShoppingList, ShoppingListPreview } from "./ShoppingList";
import { Product } from "./Product";
import DateOnly from "./DateOnly";
import { ShoppingItem } from "./ShoppingItem";

const productNames: string[] = [
  "Cukier",
  "Piątnica, Śmietana 16%",
  "Kiełbasa Wawelska, 400g paczka, Piątnica",
  "Barilla, Penne",
];

const productCategories: string[] = [
  "cukier",
  "śmietana",
  "makaron",
];

const shoppingListNames: (string | null)[] = [
  "Na cisato",
  "Piątkowe zakupy",
  `Lista zakupów #${RandInt(1, 1000)}`,
];

const shoppingCreatedDates: DateOnly[] = [
  DateOnly.parse("2023-11-11"),
  DateOnly.parse("2022-05-23"),
  DateOnly.parse("2023-07-01"),
];

function RandInt(min: number, max: number): number {
  min = Math.floor(min);
  max = Math.floor(max) - 1;

  return Math.round(Math.random() * max + min);
}

function getRandomItem<T>(array: Array<T>): T {
  return array[RandInt(0, array.length)];
}

function createArrayOf<T>(factory: (id: number) => T, count?: number): T[] {
  count ??= RandInt(1, 10);
  const array: T[] = [];
  for (let i = 0; i < count; i++) {
    const newItem: T = factory(i);
    array.push(newItem);
  }
  return array;
}

function getProduct(id: number): Product {
  return {
    id: id,
    name: productNames[RandInt(0, productNames.length)],
    category: getRandomItem(productCategories),
  } as Product;
}

function getShoppingItem(id: number): ShoppingItem {
  return {
    id: id,
    product: getProduct(id),
    count: RandInt(1, 20),
  } as ShoppingItem;
}

function getShoppingList(id: number, itemsCount: number = 10): ShoppingList {
  return {
    id: id,
    name: getRandomItem(shoppingListNames),
    dateCreated: getRandomItem(shoppingCreatedDates),
    shoppingItems: createArrayOf<ShoppingItem>(getShoppingItem, itemsCount),
    archived: RandInt(0, 2) != 1,
  } as ShoppingList;
}

function getShoppingListPreview(id: number): ShoppingListPreview {
  return {
    id: id,
    name: getRandomItem(shoppingListNames),
    dateCreated: getRandomItem(shoppingCreatedDates),
    shoppingItemsCount: RandInt(0, 20),
    archived: RandInt(0, 2) != 1,
  } as ShoppingListPreview;
}

export { getProduct, getShoppingList, getShoppingListPreview };