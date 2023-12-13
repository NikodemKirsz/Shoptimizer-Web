import { GestureResponderEvent, Text, View } from "react-native";
import { useStyles } from "../hooks";
import MyButton from "./MyButton";
import { Attributes, useCallback, useEffect, useState } from "react";
import Amounter from "./Amounter";
import { ShoppingItem } from "../models/ShoppingItem";
import { useDebounce } from "../hooks/useDebounce";
import { combine } from "../logic/viewHelpers";

interface ShoppingItemViewProps extends Attributes {
  shoppingItem: ShoppingItem;
  updateCount: (count: number) => Promise<void>;
  deleteItem: () => Promise<void>;
}

function ShoppingItemView(props: ShoppingItemViewProps) {
  const {shoppingItem, deleteItem} = props;
  const {style, color} = useStyles();

  const [count, setCount] = useState<number>(shoppingItem.count);
  const debouncedCount = useDebounce(count, 1000);

  useEffect(() => {
    
  }, [debouncedCount]);
  
  const onChangeCount = useCallback((value: number) => {
    setCount(value);
  }, []);

  const deleteShoppingItem = useCallback(async (event: GestureResponderEvent): Promise<void> => {
    await deleteItem();
  }, []);

  return (
    <View style={style.card}>
      <View style={combine(style.cardTextContainer, { maxWidth: "60%" })}>
        <Text style={combine(style.text, { fontSize: 20 })}>{shoppingItem.product.name}</Text>
      </View>
      <View style={combine(style.cardButtonsContainer, { width: 116 })}>
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
    </View>
  );
}

export default ShoppingItemView;