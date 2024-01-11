import { ShoppingListPreview } from "./ShoppingList";

type HomeProps = {
};

type SettingsProps = {
};

type MapProps = {
  shoppingListPreview: ShoppingListPreview;
};

type ShoppingListCollectionScreenProps = {
};

type ShoppingListProps = {
  shoppingListPreview: ShoppingListPreview;
};

type RootStackParamList = {
  "Home": HomeProps;
  "Settings": SettingsProps;
  "Map": MapProps;
  "Shopping Lists": ShoppingListCollectionScreenProps;
  "Shopping List": ShoppingListProps;
};

export type {
  RootStackParamList
} 