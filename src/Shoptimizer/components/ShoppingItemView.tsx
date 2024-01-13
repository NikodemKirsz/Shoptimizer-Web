import { GestureResponderEvent, Text, View } from "react-native";
import { useStyles } from "../hooks";
import MyButton from "./MyButton";
import { Attributes, useCallback, useEffect, useState } from "react";
import Amounter from "./Amounter";
import { ShoppingItem } from "../models/ShoppingItem";
import { useDebounce } from "../hooks/useDebounce";
import { combine } from "../logic/viewHelpers";

interface ShoppingItemViewProps extends Attributes {
  readonly: boolean;
  shoppingItem: ShoppingItem;
  updateCount: (count: number) => Promise<void>;
  deleteItem: () => Promise<void>;
}

function ShoppingItemView(props: ShoppingItemViewProps) {
  const {readonly, shoppingItem, updateCount, deleteItem} = props;
  const {style, color} = useStyles();

  const [initialized, setInitialized] = useState(false);
  const [count, setCount] = useState<number>(shoppingItem.count);
  const [debouncedCount, _] = useDebounce<number>(count, 1000);

  useEffect(() => {
    if (initialized) {
      updateCount(debouncedCount)
        .catch(console.warn);
    } else {
      setInitialized(true);
    }
  }, [debouncedCount]);
  
  const onChangeCount = useCallback((value: number) => {
    setCount(value);
  }, []);

  const deleteShoppingItem = useCallback(async (event: GestureResponderEvent): Promise<void> => {
    await deleteItem();
  }, []);

  return (
    <View style={style.card}>
      <View style={combine(style.cardTextContainer, { maxWidth: readonly ? "100%" : "60%" })}>
        <Text style={style.text20}>{shoppingItem.product.name}</Text>
      </View>
      {!readonly && (
        <View style={style.cardButtonsContainerWidth116}>
          <Amounter
            value={count}
            setValue={onChangeCount}
          />
          <MyButton
            backgroundColor={"red"}
            iconType={"close"}
            size={30}
            onPress={deleteShoppingItem}
          />
        </View>
      )}
    </View>
  );
}

export default ShoppingItemView;