import { ShoppingList, ShoppingListPreview } from "./ShoppingList";
import { Product, SearchProduct } from "./Product";
import DateOnly from "./DateOnly";
import { ShoppingItem } from "./ShoppingItem";
import { ShelfSection, ShoppingShop } from "./ShopModels";

const productNames: string[] = [
  "Diamant Cukier drobny 1kg",
  "Simpl Cukier biały 1kg",
  "Polski Cukier Cukier biały 1kg",
  "Diamant Cukier puder 500g",
  "Diamant Cukier puder 400g",
  "Cukier Królewski Cukier puder 400g",
  "Diamant Cukier puder 250g",
  "Simpl Cukier w kostkach 1kg",
  "Diamant Konfitur-Fix 25g",
  "Diamant Cukier kostka 500g",
  "Sunny Via Syrop z agawy 450g",
  "Diamant Cukier dekoracyjny 1kg",
  "Coco Island Mąka kokosowa 500g",
  "Basia Mąka na pizzę włoską typ 00 1kg",
];

const productCategories: string[] = [
  "cukier",
  "śmietana",
  "makaron",
];

const shoppingListNames: string[] = [
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
  count ??= RandInt(0, 10);
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
    brand: "Carrefour",
    category: getRandomItem(productCategories),
  };
}

function getSearchProduct(id: number): SearchProduct {
  return {
    id: id,
    name: productNames[RandInt(0, productNames.length)],
    brand: "Carrefour",
    categoryId: RandInt(1, 100),
    categoryBreadcrumbs: ["Artykuły spożywcze", "Sypkie i produkty zbożowe", "Ryż"],
  };
}

function getShoppingItem(id: number): ShoppingItem {
  return {
    id: id,
    shoppingListId: 1,
    product: getProduct(id),
    count: RandInt(1, 20),
  };
}

function getShoppingList(id: number, itemsCount: number = 10): ShoppingList {
  return {
    id: id,
    userId: 1,
    name: getRandomItem(shoppingListNames),
    dateCreated: "12-23-2323",//getRandomItem(shoppingCreatedDates),
    shoppingItems: createArrayOf<ShoppingItem>(getShoppingItem, itemsCount),
    archived: RandInt(0, 2) != 1,
  };
}

function getShoppingListPreview(id: number): ShoppingListPreview {
  return {
    id: id,
    userId: 1,
    name: getRandomItem(shoppingListNames),
    dateCreated: "12-23-2323",//getRandomItem(shoppingCreatedDates),
    itemsCount: RandInt(0, 20),
    archived: RandInt(0, 2) != 1,
  };
}

function createSectionArray() {
  return createArrayOf<ShelfSection>(
    (i) => {
      return {
        id: i.toString(),
        name: getRandomItem(productCategories),
        size: RandInt(1, 4),
        skip: RandInt(0, 2),
        items: createArrayOf<string>(
          () => getRandomItem(productNames),
          RandInt(0, 10),
        )
      } as ShelfSection;
    },
    RandInt(0, 3),
  );
}

function getShoppingShop(): ShoppingShop {
  return {
    id: "1",
    name: "Carrefour",
    address: "Popławska 4/20, 95-200 Pabianice",
    floor: {
      floorDimensions: {
        width: 640,
        height: 320,
      },
      shelves: [
        {
          id: "1",
          dimensions: { width: 20, height: 320 },
          position: { top: 0, left: 0 },
          sections: [],
        },
        {
          id: "2",
          dimensions: { width: 20, height: 80 },
          position: { top: 60, left: 80 },
          sections: [],
        },
        {
          id: "3",
          dimensions: { width: 20, height: 80 },
          position: { top: 60, left: 60 },
          sections: [],
        },
        {
          id: "5",
          dimensions: { width: 20, height: 80 },
          position: { top: 180, left: 60 },
          sections: [],
        },
        {
          id: "6",
          dimensions: { width: 20, height: 80 },
          position: { top: 180, left: 80 },
          sections: [],
        },
        {
          id: "7",
          dimensions: { width: 20, height: 60 },
          position: { top: 240, left: 140 },
          sections: [],
        },
        {
          id: "8",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 140 },
          sections: [],
        },
        {
          id: "9",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 160 },
          sections: [],
        },
        {
          id: "10",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 220 },
          sections: [],
        },
        {
          id: "11",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 240 },
          sections: [],
        },
        {
          id: "12",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 300 },
          sections: [],
        },
        {
          id: "13",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 320 },
          sections: [],
        },
        {
          id: "14",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 380 },
          sections: [],
        },
        {
          id: "15",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 400 },
          sections: [],
        },
        {
          id: "16",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 460 },
          sections: [],
        },
        {
          id: "17",
          dimensions: { width: 20, height: 140 },
          position: { top: 60, left: 480 },
          sections: [],
        },
        {
          id: "18",
          dimensions: { width: 20, height: 200 },
          position: { top: 60, left: 540 },
          sections: [],
        },
        {
          id: "19",
          dimensions: { width: 20, height: 200 },
          position: { top: 60, left: 560 },
          sections: [],
        },
        {
          id: "20",
          dimensions: { width: 20, height: 240 },
          position: { top: 20, left: 620 },
          sections: [],
        },
        
        {
          id: "21",
          dimensions: { width: 280, height: 20 },
          position: { top: 0, left: 60 },
          sections: [],
        },
        {
          id: "22",
          dimensions: { width: 120, height: 20 },
          position: { top: 240, left: 160 },
          sections: [],
        },
        {
          id: "23",
          dimensions: { width: 260, height: 20 },
          position: { top: 0, left: 380 },
          sections: [],
        },
        {
          id: "24",
          dimensions: { width: 140, height: 20 },
          position: { top: 300, left: 20 },
          sections: [],
        },
      ],
      roads: [
        {
          id: "1",
          dimensions: { width: 4, height: 220 },
          position: { top: 40, left: 398 },
        },
        {
          id: "2",
          dimensions: { width: 4, height: 140 },
          position: { top: 40, left: 338 },
        },
        {
          id: "3",
          dimensions: { width: 4, height: 140 },
          position: { top: 40, left: 278 },
        },
        {
          id: "4",
          dimensions: { width: 4, height: 140 },
          position: { top: 40, left: 218 },
        },
        {
          id: "5",
          dimensions: { width: 4, height: 140 },
          position: { top: 40, left: 158 },
        },
        {
          id: "6",
          dimensions: { width: 4, height: 180 },
          position: { top: 40, left: 98 },
        },
        {
          id: "7",
          dimensions: { width: 4, height: 180 },
          position: { top: 40, left: 38 },
        },
        {
          id: "8",
          dimensions: { width: 360, height: 4 },
          position: { top: 38, left: 40 },
        },
        {
          id: "9",
          dimensions: { width: 60, height: 4 },
          position: { top: 118, left: 40 },
        },
        {
          id: "10",
          dimensions: { width: 240, height: 4 },
          position: { top: 178, left: 100 },
        },
        {
          id: "11",
          dimensions: { width: 60, height: 4 },
          position: { top: 218, left: 40 },
        },
      ],
      checkouts: [
        {
          id: "1",
          dimensions: { width: 260, height: 20 },
          position: { top: 240, left: 280 },
        },
      ],
    },
  };
}

export {
  getProduct,
  getSearchProduct,
  getShoppingList,
  getShoppingListPreview,
  getShoppingShop,
};