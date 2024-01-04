import {
  ActivityIndicator,
  DimensionValue,
  NativeSyntheticEvent,
  ScrollView,
  TextInput,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useStyles } from "../hooks";
import MyButton from "./MyButton";
import { useDebounce } from "../hooks/useDebounce";
import MyPressable from "./MyPressable";
import { combine } from "../logic/viewHelpers";

interface ItemBase {
  id: number | string;
}

type AutocompleteInputProps<TItem extends ItemBase> = {
  fetchItems: (phrase: string, signal?: AbortSignal) => Promise<TItem[]>;
  renderItem: (item: TItem) => ReactNode;
  submitItem: (item: TItem, signal?: AbortSignal) => Promise<void>;
  placeholder: string;
  debounceTime?: number;
};

function AutocompleteInput<TItem extends ItemBase>(props: AutocompleteInputProps<TItem>) {
  let {fetchItems, renderItem, submitItem, placeholder, debounceTime} = props;
  const {style, color} = useStyles();
  
  const clearButtonPadding = 40;
  debounceTime ??= 500;

  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInput, setDebouncedValue] = useDebounce<string>(inputValue, debounceTime);
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<TItem[]>([]);
  
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (debouncedInput.length < 3) {
      setItems([]);
      return;
    }
    
    const abortController = new AbortController();
    
    (async (): Promise<void> => {
      setLoading(true);
      
      const fetchedItems: TItem[] = await fetchItems(debouncedInput, abortController.signal);
      setItems(fetchedItems);
      
      setLoading(false);
    })()
      .catch(console.error);
    
    return () => abortController.abort();
  }, [debouncedInput]);

  const onInputChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    setInputValue(value);
  }, [setInputValue]);

  const clearInput = useCallback(() => {
    setInputValue("");
    setDebouncedValue("");
    setItems([]);
  }, [setInputValue, setDebouncedValue, setItems]);
  
  const onSelectItem = useCallback(async (selectedItem: TItem) => {
    clearInput();
    await submitItem(selectedItem);
  }, [clearInput, submitItem]);
  
  return (
    <View style={style.maxWidth}>
      <View style={style.rowItemsContainer}>
        <TextInput
          ref={inputRef}
          style={combine(style.input, style.text, { width: "100%", paddingRight: clearButtonPadding })}
          value={inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
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
        <ScrollView style={style.autocompleteDropdown}>
          {items?.length > 0 ? items.map((item: TItem) =>
            <MyPressable
              key={`AutocompleteItem-${item.id}`}
              style={style.autocompleteListItem}
              onPress={() => onSelectItem(item)}
            >
              {renderItem(item)}
            </MyPressable>
          ) : (
            <View style={style.containerPadded8}>
              <Text style={style.text}>Brak wyników</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

export default AutocompleteInput;