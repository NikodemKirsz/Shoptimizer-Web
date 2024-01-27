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
    shopId: "659b3425d4640bbf55de1434",
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
    shopId: "659b3425d4640bbf55de1434",
    dateCreated: "12-23-2323",//getRandomItem(shoppingCreatedDates),
    itemsCount: RandInt(0, 20),
    shopPreview: {
      id: "659b3425d4640bbf55de1434",
      name: "Carrefour",
      address: "Popłąwska 46",
    },
    archived: RandInt(0, 2) != 1,
  };
}

function createSectionArray() {
  return createArrayOf<ShelfSection>(
    (i) => {
      return {
        number: i,
        categoryName: getRandomItem(productCategories),
        size: RandInt(1, 4),
        skip: RandInt(0, 2),
        shoppingProducts: [],
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
      dimensions: {
        width: 400,
        height: 560,
      },
      shelves: [
        {
          number: 1,
          dimensions: { width: 20, height: 500 },
          position: { top: 0, left: 0 },
          sections: [],
        },
        {
          number: 2,
          dimensions: { width: 20, height: 180 },
          position: { top: 60, left: 60 },
          sections: [],
        },
        {
          number: 3,
          dimensions: { width: 20, height: 180 },
          position: { top: 60, left: 80 },
          sections: [],
        },
        {
          number: 4,
          dimensions: { width: 20, height: 180 },
          position: { top: 60, left: 140 },
          sections: [],
        },
        {
          number: 5,
          dimensions: { width: 20, height: 180 },
          position: { top: 60, left: 160 },
          sections: [],
        },
        {
          number: 6,
          dimensions: { width: 20, height: 180 },
          position: { top: 60, left: 220 },
          sections: [],
        },
        {
          number: 7,
          dimensions: { width: 20, height: 180 },
          position: { top: 60, left: 240 },
          sections: [],
        },
        {
          number: 8,
          dimensions: { width: 20, height: 180 },
          position: { top: 60, left: 300 },
          sections: [],
        },
        {
          number: 9,
          dimensions: { width: 20, height: 180 },
          position: { top: 60, left: 320 },
          sections: [],
        },
        {
          number: 10,
          dimensions: { width: 20, height: 180 },
          position: { top: 280, left: 60 },
          sections: [],
        },
        {
          number: 11,
          dimensions: { width: 20, height: 180 },
          position: { top: 280, left: 80 },
          sections: [],
        },
        {
          number: 12,
          dimensions: { width: 20, height: 180 },
          position: { top: 280, left: 140 },
          sections: [],
        },
        {
          number: 13,
          dimensions: { width: 20, height: 180 },
          position: { top: 280, left: 160 },
          sections: [],
        },
        {
          number: 14,
          dimensions: { width: 20, height: 180 },
          position: { top: 280, left: 220 },
          sections: [],
        },
        {
          number: 15,
          dimensions: { width: 20, height: 180 },
          position: { top: 280, left: 240 },
          sections: [],
        },
        {
          number: 16,
          dimensions: { width: 20, height: 180 },
          position: { top: 280, left: 300 },
          sections: [],
        },
        {
          number: 17,
          dimensions: { width: 20, height: 180 },
          position: { top: 280, left: 320 },
          sections: [],
        },
        {
          number: 18,
          dimensions: { width: 20, height: 460 },
          position: { top: 0, left: 380 },
          sections: [],
        },
        
        {
          number: 19,
          dimensions: { width: 360, height: 20 },
          position: { top: 0, left: 20 },
          sections: [],
        },
        {
          number: 20,
          dimensions: { width: 120, height: 20 },
          position: { top: 500, left: 60 },
          sections: [],
        },
      ],
      roads: [],
      checkouts: [
        {
          number: 1,
          dimensions: { width: 220, height: 20 },
          position: { top: 500, left: 180 },
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