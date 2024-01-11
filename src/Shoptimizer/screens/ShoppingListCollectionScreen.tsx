import {
  ActivityIndicator,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { ShoppingListPostDto, ShoppingListPreview } from "../models/ShoppingList";
import { useStyles } from "../hooks";
import MyButton from "../components/MyButton";
import MyModal from "../components/MyModal";
import { RootStackParamList } from "../models/NavigationData";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { combine, deconstructProps } from "../logic/viewHelpers";
import { isNullOrWhitespace, trimmedOrNull } from "../logic/stringHelpers";
import DateOnly from "../models/DateOnly";
import { Backend } from "../logic/backend";
import { ShopPreview } from "../models/ShopModels";
import ShoppingListCollectionView from "../components/ShoppingListCollectionView";

type Props = NativeStackScreenProps<RootStackParamList, "Shopping Lists">;

const PreviewShopDropdown = Dropdown<ShopPreview>;

function ShoppingListCollectionScreen(props: Props) {
  const {navigation, route} = deconstructProps(props);
  const {style, color} = useStyles();
  
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [createShoppingListButtonDisabled, setCreateShoppingListButtonDisabled] = useState<boolean>(false);
  const [newShoppingListName, setNewShoppingListName] = useState<string>("");
  const [newShoppingListShopId, setNewShoppingListShopId] = useState<string>();
  const [shopPreviews, setShopPreviews] = useState<ShopPreview[]>();
  const [listRefreshToggle, setListRefreshToggle] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const shopPreviewResponse = await Backend.getShopPreviews(abortController.signal);
      setShopPreviews(shopPreviewResponse.data);
    })()
      .catch(console.warn);

    return () => abortController.abort();
  }, [navigation]);

  useEffect(() => {
    const submitEnabled: boolean = !!newShoppingListShopId && !isNullOrWhitespace(newShoppingListName);
    setCreateShoppingListButtonDisabled(!submitEnabled);
  }, [newShoppingListShopId, newShoppingListName]);
  
  const showModal = useCallback((show: boolean) => {
    if (show) {
      setNewShoppingListName("");
      setNewShoppingListShopId(undefined);
    }
    setModalVisible(show);
  }, [setNewShoppingListName, setModalVisible]);

  const refreshList = useCallback(() => {
    setListRefreshToggle(old => !old);
  }, [setListRefreshToggle]);
  
  const onNewNameChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    setNewShoppingListName(value);
  }, [setNewShoppingListName]);
  
  const createNewShoppingList = useCallback(async (name: string, shopId: string) => {
    setCreateShoppingListButtonDisabled(true);
    
    const normalizedName: string = trimmedOrNull(name) ?? `Lista zakupowa ${DateOnly.today().toString(false)}`;
    
    const newShoppingListPostDto: ShoppingListPostDto = {
      name: normalizedName,
      archived: false,
      shopId: shopId,
      userId: 1,
    };
    
    const response = await Backend.createShoppingList(newShoppingListPostDto);
    if (response.success) {
      refreshList();
    }
    
    showModal(false);
    
    setCreateShoppingListButtonDisabled(false);
  }, [setCreateShoppingListButtonDisabled]);

  const navigateToShoppingList = useCallback((shoppingList: ShoppingListPreview) => {
    console.log(`Navigating!, ShoppingLIst=${shoppingList.id}`)
    return navigation.navigate({
      name: "Shopping List",
      params: {
        shoppingListPreview: shoppingList,
      },
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={style.cardButtonsContainer}>
          <MyButton
            containerStyle={{ marginRight: 8 }}
            size={36}
            backgroundColor="#00000000"
            onPress={refreshList}
            iconType={"refresh"}
          />
          <MyButton
            containerStyle={{ marginRight: 8 }}
            size={36}
            backgroundColor="#00000000"
            onPress={() => showModal(true)}
            iconType={"add"}
          />
        </View>
      ),
    });
  }, [navigation]);
  
  return (
    <>
      <ShoppingListCollectionView
        onShoppingListPress={navigateToShoppingList}
        refreshListToggle={listRefreshToggle}
        readonly={false}
      />
      <MyModal
        center={true}
        visible={modalVisible}
        close={() => setModalVisible(false)}
      >
        <View style={style.maxWidth}>
          <TextInput
            style={combine(style.input, style.text, { fontSize: 20, height: "auto" })}
            value={newShoppingListName}
            onChange={onNewNameChange}
            placeholder={"Wpisz nazwę listy zakupowej"}
            placeholderTextColor={color.placeholder}
          />
          <View style={{ width: "100%", marginVertical: 8 }}>
            {!!shopPreviews ? (
              <PreviewShopDropdown
                data={shopPreviews}
                labelField={"name"}
                valueField={"id"}
                activeColor={color.card}
                containerStyle={style.productHintContainerView}
                itemContainerStyle={{ paddingVertical: 8, paddingHorizontal: 4 }}
                placeholder={"Wybierz sklep"}
                placeholderStyle={style.text20}
                selectedTextStyle={style.text20}
                renderItem={(item: ShopPreview, selected?: boolean) => (
                  <>
                    <Text style={style.text20}>{item.name}</Text>
                    <Text style={style.subText}>{item.address}</Text>
                  </>
                )}
                onChange={(shop: ShopPreview) => setNewShoppingListShopId(shop.id)}
              />
            ) : (
              <ActivityIndicator style={{ margin: 8 }} size={"large"}/>
            )}
          </View>
          
          <View style={combine(style.rowButtonContainer, { marginTop: 16 })}>
            <MyButton
              size={40}
              backgroundColor={"green"}
              iconType={"done"}
              onPress={() => createNewShoppingList(newShoppingListName, newShoppingListShopId!)}
              disabled={createShoppingListButtonDisabled}
            />
            <MyButton
              size={40}
              backgroundColor={"red"}
              iconType={"close"}
              onPress={() => showModal(false)}
            />
          </View>
        </View>
      </MyModal>
    </>
  );
}

export default ShoppingListCollectionScreen;