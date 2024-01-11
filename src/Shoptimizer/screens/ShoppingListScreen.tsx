import { useStyles } from "../hooks";
import {
  ActivityIndicator, Dimensions,
  ScrollView,
  Text, useWindowDimensions,
  View
} from "react-native";
import ShoppingItemView from "../components/ShoppingItemView";
import { useCallback, useEffect, useState } from "react";
import { ShoppingList } from "../models/ShoppingList";
import MyButton from "../components/MyButton";
import MyModal from "../components/MyModal";
import { ShoppingItem, ShoppingItemPostDto } from "../models/ShoppingItem";
import AutocompleteInput from "../components/AutocompleteInput";
import { RootStackParamList } from "../models/NavigationData";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { combine, deconstructProps } from "../logic/viewHelpers";
import { SearchProduct } from "../models/Product";
import { Backend } from "../logic/backend";
import DateOnly from "../models/DateOnly";

type Props = NativeStackScreenProps<RootStackParamList, "Shopping List">;

const SearchProductAutocompleteInput = AutocompleteInput<SearchProduct>;

function ShoppingListScreen(props: Props) {
  const {navigation, route, params: {shoppingListPreview}} = deconstructProps(props);
  const {style, color} = useStyles();
  
  const shoppingListId = shoppingListPreview.id;
  
  const [screenHeight, _] = useState(Dimensions.get('screen').height);
  const [shoppingList, setShoppingList] = useState<ShoppingList>();
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    
    (async () => {
      const response = await Backend.getShoppingListWithShoppingItems(shoppingListId, abortController.signal);
      const list = response.data;
      setShoppingList(list);
      setShoppingItems(list.shoppingItems);
    })()
      .catch(console.warn);
    
    return () => abortController.abort();
  }, [shoppingListId]);

  useEffect(() => {
    navigation.setOptions({
      title: shoppingListPreview?.name,
      headerRight: () => (
        <View style={style.cardButtonsContainer}>
          {!shoppingListPreview.archived && (
            <>
              <MyButton
                containerStyle={{ marginRight: 8 }}
                size={36}
                backgroundColor="#00000000"
                onPress={() => navigation.navigate({
                  name: "Map",
                  params: {
                    shoppingListPreview: shoppingListPreview,
                  },
                })}
                iconType={"map"}
              />
              <MyButton
                containerStyle={{marginRight: 8}}
                size={36}
                backgroundColor="#00000000"
                onPress={() => showModal(true)}
                iconType={"add"}
              />
            </>
          )}
        </View>
      ),
    });
  }, [navigation, shoppingListPreview]);

  const updateShoppingItemCount = useCallback(async (id: number, count: number) => {
    await Backend.updateShoppingItemCount(id, count);
  }, []);
  
  const deleteShoppingItem = useCallback(async (id: number) => {
    setShoppingItems(
      old => old.filter(shoppingList => shoppingList.id != id)
    );
    
    await Backend.deleteShoppingItem(id);
  }, [setShoppingItems]);

  const showModal = useCallback((show: boolean) => {
    setModalVisible(show);
  }, [setModalVisible]);
  
  const fetchSearchProducts = useCallback(async (phrase: string, signal?: AbortSignal): Promise<SearchProduct[]> => {
    const response = await Backend.searchProducts(shoppingListId, phrase, signal);
    return response.data;
  }, []);
  
  const submitSearchProduct = useCallback(async (searchProduct: SearchProduct, signal?: AbortSignal) => {
    const newShoppingItemPost: ShoppingItemPostDto = {
      productId: searchProduct.id,
      count: 1,
      shoppingListId: shoppingListId
    };
    
    const response = await Backend.createShoppingItem(newShoppingItemPost, signal);
    if (response.success) {
      const newShoppingItem = response.data;
      newShoppingItem.product = {
        id: searchProduct.id,
        name: searchProduct.name,
        brand: searchProduct.brand,
        category: searchProduct.categoryBreadcrumbs[searchProduct.categoryBreadcrumbs.length - 1],
      };
      
      setShoppingItems(old => [...old, newShoppingItem]);
      setModalVisible(false);
    }
  }, []);

  return (
    <>
      {!!shoppingList && !!shoppingItems ? (
        <ScrollView style={style.scrollExtendedView}>
          <View style={style.titleContainer}>
            <Text style={combine(style.text, { fontSize: 32 })}>{shoppingList.name}</Text>
            <View style={combine(style.rowItemsContainer, { justifyContent: "center", gap: 16 })}>
              <Text style={style.subText}>ID: {shoppingList.id}</Text>
              <Text style={style.subText}>Utworzono: {new DateOnly(shoppingList.dateCreated).toString(false)}</Text>
            </View>
          </View>
          
          {shoppingItems.length > 0 ? (
            shoppingItems.map(item =>
              <ShoppingItemView
                key={`ShoppingListItem-${item.id}`}
                readonly={shoppingList.archived}
                shoppingItem={item}
                updateCount={async (count: number) => (updateShoppingItemCount(item.id, count))}
                deleteItem={async () => deleteShoppingItem(item.id)}
              />
            )
          ) : (
            <Text>Lista zakupowa jest pusta</Text>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator style={{ margin: 20 }} size={"large"}/>
      )}
      <MyModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
        mainContainerStyle={{ marginTop: 80, maxHeight: screenHeight * 0.7 }}
      >
        <SearchProductAutocompleteInput
          placeholder={"Wpisz nazwę produktu"}
          fetchItems={fetchSearchProducts}
          renderItem={(product: SearchProduct) => (
            <>
              <Text style={combine(style.text, { fontSize: 18 })}>{product.name}</Text>
              <Text style={combine(style.subText, { fontSize: 12 })}>{product.categoryBreadcrumbs?.join(' -> ')}</Text>
            </>
          )}
          submitItem={submitSearchProduct}
        />
      </MyModal>
    </>
  );
}

export default ShoppingListScreen;