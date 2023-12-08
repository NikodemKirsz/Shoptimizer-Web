import {
  ActivityIndicator,
  DimensionValue,
  NativeSyntheticEvent, ScrollView,
  TextInput,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStyles } from "../hooks";
import { Product } from "../models/Product";
import { combine, delay } from "../logic/helpers";
import { getProduct } from "../models/FakeData";
import MyButton from "./MyButton";
import { useDebounce } from "../hooks/useDebounce";
import MyPressable from "./MyPressable";

type ProductSearchAutocompleteInputProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  debounceTime?: number;
  submitProduct: (product: Product) => void;
};

function ProductSearchAutocompleteInput(props: ProductSearchAutocompleteInputProps) {
  let {width, height, debounceTime, submitProduct} = props;
  const {style, color} = useStyles();
  
  const clearButtonPadding = 40;
  debounceTime ??= 500;
  width ??= "100%";
  height ??= "70%";

  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInput, setDebouncedValue] = useDebounce<string>(inputValue, debounceTime);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (debouncedInput.length < 3) {
      setProducts([]);
      return;
    }
    
    const fetchData = async () => {
      setLoading(true);

      await delay(500);

      setProducts([1, 2].map(getProduct));
      setLoading(false);
    }
    
    fetchData()
      .catch(console.error);
  }, [debouncedInput]);

  const onInputChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    setInputValue(value);
  }, []);

  const clearInput = useCallback(() => {
    setInputValue("");
    setDebouncedValue("");
    setProducts([]);
  }, []);
  
  const onSelectProduct = useCallback((selectedProduct: Product) => {
    clearInput();
    submitProduct(selectedProduct);
  }, []);

  const onClearPress = useCallback(() => {
    setProducts([]);
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened: boolean) => {
    console.log("isOpened", isOpened);
  }, []);
  
  return (
    <View style={style.container}>
      <View style={style.rowItemsContainer}>
        <TextInput
          ref={inputRef}
          style={combine(style.input, style.text, { width: width, paddingRight: clearButtonPadding })}
          value={inputValue}
          onChange={onInputChange}
          placeholder={"Wpisz nazwę produktu"}
          placeholderTextColor={color.placeholder}
        />
        <View style={{ position: "absolute", right: clearButtonPadding / 4 }}>
          {!loading ? (
            <MyButton
              backgroundColor={color.transparent}
              iconType={"close"}
              onPress={clearInput}
            />
          ) : (
            <ActivityIndicator/>
          )}
        </View>
      </View>
      {debouncedInput.length >= 3 && !loading && (
        <ScrollView
          style={combine({
            flexGrow: 0,
            height: "auto",
            maxHeight: height,
            width: width,
            backgroundColor: color.listItem,
            borderRadius: 16,
          })}
        >
          {products?.length > 0 ? products.map(p =>
            <MyPressable
              key={p.id}
              style={{ padding: 8, borderBottomWidth: 2, borderBottomColor: color.background }}
              onPress={() => onSelectProduct(p)}
            >
              <Text style={style.text}>{p.name}</Text>
              <Text style={style.subText}>{p.category}</Text>
            </MyPressable>
          ) : (
            <View style={combine(style.container, { padding: 8 })}>
              <Text style={style.text}>Brak wyników</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

export default ProductSearchAutocompleteInput;