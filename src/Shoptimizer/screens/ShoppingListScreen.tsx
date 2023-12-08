import { useStyles } from "../hooks";
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInputChangeEventData,
  View
} from "react-native";
import ShoppingItemView from "../components/ShoppingItemView";
import { useCallback, useEffect, useState } from "react";
import { ShoppingList } from "../models/ShoppingList";
import { getShoppingList } from "../models/FakeData";
import MyButton from "../components/MyButton";
import MyModal from "../components/MyModal";
import { combine, deconstructProps } from "../logic/helpers";
import { ShoppingItem } from "../models/ShoppingItem";
import ProductSearchAutocompleteInput from "../components/ProductSearchAutocompleteInput";
import { RootStackParamList } from "../models/NavigationData";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Shopping List">;

function ShoppingListScreen(props: Props) {
  const {navigation, route, params: {shoppingListPreview}} = deconstructProps(props);
  const {style, color} = useStyles();

  const [shoppingList, setShoppingList] = useState<ShoppingList>();
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const list = getShoppingList(1, 12);
    setShoppingList(list);
    setShoppingItems(list.shoppingItems);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: shoppingListPreview?.name,
      headerRight: () => (
        <MyButton
          containerStyle={{marginRight: 8}}
          size={36}
          backgroundColor="#00000000"
          onPress={() => showModal(true)}
          iconType={"add"}
        />
      ),
    });
  }, [navigation, shoppingListPreview]);

  const updateShoppingItemCount = useCallback((id: number, count: number) => {
    return Promise.resolve(undefined);
  }, []);
  
  const deleteShoppingItem = useCallback(async (id: number) => {
    setShoppingItems(
      old => old.filter(shoppingList => shoppingList.id != id)
    );
  }, [setShoppingItems]);

  const showModal = useCallback((show: boolean) => {
    setModalVisible(show);
  }, [setModalVisible]);

  return (
    <>
      {!!shoppingList && !!shoppingItems ? (
        <ScrollView style={{ paddingBottom: 500 }}>
          <View style={style.titleContainer}>
            <Text style={combine(style.text, { fontSize: 32 })}>{shoppingList.name}</Text>
            <Text style={style.subText}>ID: {shoppingList.id}   Utworzono: {shoppingList.dateCreated.toString(false)}</Text>
          </View>
          
          {shoppingItems.length > 0 ? (
            shoppingItems.map(product =>
              <ShoppingItemView
                key={`ShoppingListItem-${product.id}`}
                shoppingItem={product}
                updateCount={async (count: number) => (updateShoppingItemCount(product.id, count))}
                deleteItem={async () => deleteShoppingItem(product.id)}
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
        mainContainerStyle={{ marginTop: 80 }}
      >
        <View style={{ width: '100%' }}>
          <ProductSearchAutocompleteInput
            submitProduct={(p) => console.log(p)}
          />
        </View>
      </MyModal>
    </>
  );
}

export default ShoppingListScreen;