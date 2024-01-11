﻿import { useStyles } from "../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationData";
import Shop from "../components/shop/Shop";
import { useCallback, useEffect, useState } from "react";
import { ShoppingShop } from "../models/ShopModels";
import { getShoppingShop } from "../models/FakeData";
import { Backend } from "../logic/backend";
import MyButton from "../components/MyButton";
import { deconstructProps } from "../logic/viewHelpers";
import MyModal from "../components/MyModal";
import ShoppingListCollectionView from "../components/ShoppingListCollectionView";
import { ShoppingListPreview } from "../models/ShoppingList";
import { ActivityIndicator, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

function MapScreen(props: Props) {
  const {style, color} = useStyles();
  const {navigation, route, params} = deconstructProps(props);

  const [shoppingList, setShoppingList] = useState<ShoppingListPreview>(params.shoppingListPreview);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [shoppingShop, setShoppingShop] = useState<ShoppingShop>();
  const [completeShoppingButtonDisabled, setCompleteShoppingButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (!shoppingList)
      return;
    
    const abortController = new AbortController();
    
    (async () => {
      const response = await Backend.getShoppingShopForShoppingList(shoppingList.id, abortController.signal); 
      setShoppingShop(response.data);
    })()
      .catch(console.warn);
    
    return () => abortController.abort();
  }, [shoppingList.id]);
  
  const completeShopping = useCallback(async (shoppingListId: number) => {
    setCompleteShoppingButtonDisabled(true);
    
    const response = await Backend.archiveShoppingList(shoppingListId);
    if (response.success) {
      navigation.push(
        "Home", {
        screen: "Shopping Lists"
      });
    } else {
      setCompleteShoppingButtonDisabled(false);
    }
  }, [navigation, setCompleteShoppingButtonDisabled]);

  useEffect(() => {
    navigation.setOptions({
      title: shoppingList.name,
      headerRight: () => (
        <View style={style.cardButtonsContainer}>
          <MyButton
            containerStyle={{ marginRight: 8 }}
            size={36}
            backgroundColor="#00000000"
            onPress={() => setShowModal(true)}
            iconType={"list"}
          />
          <MyButton
            containerStyle={{ marginRight: 8 }}
            size={36}
            backgroundColor="#00000000"
            onPress={() => completeShopping(shoppingList.id)}
            iconType={"done"}
            disabled={!shoppingList || completeShoppingButtonDisabled}
          />
        </View>
      ),
    });
  }, [navigation, shoppingList.id, completeShopping, completeShoppingButtonDisabled]);
  
  const onChooseShoppingList = useCallback((shoppingList: ShoppingListPreview) => {
    setShowModal(false);
    setShoppingList(shoppingList);
  }, []);

  return (
    <>
      {shoppingShop ? (
        <Shop shop={shoppingShop}/>
      ) : (
        <ActivityIndicator style={{margin: 8}} size={"large"}/>
      )}
      <MyModal
        center={true}
        visible={showModal || !shoppingList}
        close={() => setShowModal(false)}
        mainContainerStyle={{ height: "80%", width: "70%" }}
      >
        <ShoppingListCollectionView
          onShoppingListPress={onChooseShoppingList}
          readonly={true}
          includeArchived={false}
        />
      </MyModal>
    </>
  );
}

export default MapScreen;