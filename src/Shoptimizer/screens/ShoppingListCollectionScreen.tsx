import {
  ActivityIndicator,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  View
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { ShoppingListPostDto, ShoppingListPreview } from "../models/ShoppingList";
import { useStyles } from "../hooks";
import MyButton from "../components/MyButton";
import MyModal from "../components/MyModal";
import { RootStackParamList } from "../models/NavigationData";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MyPressable from "../components/MyPressable";
import { combine, deconstructProps } from "../logic/viewHelpers";
import { trimmedOrNull } from "../logic/stringHelpers";
import DateOnly from "../models/DateOnly";
import { Backend } from "../logic/backend";

type Props = NativeStackScreenProps<RootStackParamList, "Shopping Lists">;

function ShoppingListCollectionScreen(props: Props) {
  const {navigation, route} = deconstructProps(props);
  const {style, color} = useStyles();
  
  const [shoppingListPreviews, setShoppingListPreviews] = useState<ShoppingListPreview[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [createShoppingListButtonDisabled, setCreateShoppingListButtonDisabled] = useState<boolean>(false);
  const [newShoppingListName, setNewShoppingListName] = useState<string>("");
  
  useEffect(() => {
    const abortController = new AbortController();
    
    (async () => {
      const shoppingListsResponse = await Backend.getShoppingListPreviewsForUser(1, abortController.signal);
      setShoppingListPreviews(shoppingListsResponse.data);
    })()
      .catch(console.warn);
    
    return () => abortController.abort();
  }, [setShoppingListPreviews]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MyButton
          containerStyle={{ marginRight: 8 }}
          size={36}
          backgroundColor="#00000000"
          onPress={() => showModal(true)}
          iconType={"add"}
        />
      ),
    });
  }, [navigation]);
  
  const deleteShoppingList = useCallback(async (id: number) => {
    setShoppingListPreviews(
      old => old.filter(shoppingList => shoppingList.id != id)
    );
    
    await Backend.deleteShoppingList(id);
  }, [setShoppingListPreviews]);

  const archiveShoppingList = useCallback(async (id: number) => {
    setShoppingListPreviews(
      old => {
        const index = old.findIndex(shoppingList => shoppingList.id === id)
        if (index < 0)
          return old;
        
        const modifiedElement = old[index];
        modifiedElement.archived = true;
        
        return [...old.slice(0, index), modifiedElement, ...old.slice(index + 1)];
      }
    );
    
    await Backend.archiveShoppingList(id);
  }, [setShoppingListPreviews]);
  
  const showModal = useCallback((show: boolean) => {
    if (show)
      setNewShoppingListName("");
    setModalVisible(show);
  }, [setNewShoppingListName, setModalVisible]);
  
  const onNewNameChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    setNewShoppingListName(value);
  }, [setNewShoppingListName]);
  
  const createNewShoppingList = useCallback(async (name: string) => {
    setCreateShoppingListButtonDisabled(true);
    
    const normalizedName: string = trimmedOrNull(name) ?? `Lista zakupowa ${DateOnly.today().toString(false)}`;
    
    const newShoppingListPostDto: ShoppingListPostDto = {
      name: normalizedName,
      userId: 1,
      archived: false,
    };
    
    const response = await Backend.createShoppingList(newShoppingListPostDto);
    if (response.success) {
      const newShoppingList = response.data;
      const newShoppingListPreview: ShoppingListPreview = {
        id: newShoppingList.id,
        name: newShoppingList.name,
        dateCreated: newShoppingList.dateCreated,
        archived: newShoppingList.archived,
        userId: 1,
        itemsCount: 0,
      };
      
      setShoppingListPreviews(
        old => [newShoppingListPreview, ...old]
      );
      
      showModal(false);
    }
    
    setCreateShoppingListButtonDisabled(false);
  }, [setShoppingListPreviews, setCreateShoppingListButtonDisabled]);
  
  const archivedCardStyle = combine(style.card, { opacity: 0.6 });
  
  return (
    <>
      <ScrollView style={style.scrollExtendedView}>
        {shoppingListPreviews ? (
          shoppingListPreviews.map(shoppingList =>
            <MyPressable
              key={`ShoppingListCollectionItem-${shoppingList.id}`}
              style={!shoppingList.archived ? style.card : archivedCardStyle}
              onPress={() => navigation.navigate({
                name: "Shopping List",
                params: {
                  shoppingListPreview: shoppingList,
                },
              })}
            >
              <View style={style.cardTextContainer}>
                <Text style={style.text}>{shoppingList.name}</Text>
                <View style={combine(style.rowItemsContainer, { gap: 12 })}>
                  <Text style={style.subText}>{new DateOnly(shoppingList.dateCreated).toString(false)}</Text>
                  <Text style={style.subText}>#{shoppingList.id}</Text>
                  <Text style={style.subText}>Produktów: {shoppingList.itemsCount}</Text>
                </View>
              </View>
              <View style={combine(style.cardButtonsContainer, { width: 70 })}>
                {!shoppingList.archived && (
                  <MyButton
                    backgroundColor={'orange'}
                    iconType={'done'}
                    size={34}
                    onPress={() => archiveShoppingList(shoppingList.id)}
                  />
                )}
                <MyButton
                  backgroundColor={'red'}
                  iconType={'close'}
                  size={34}
                  onPress={() => deleteShoppingList(shoppingList.id)}
                />
              </View>
            </MyPressable>
          )
        ) : (
          <ActivityIndicator style={{margin: 20}} size={"large"} />
        )}
      </ScrollView>
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
          <View style={combine(style.rowButtonContainer, { marginTop: 16 })}>
            <MyButton
              size={40}
              backgroundColor={"green"}
              iconType={"done"}
              onPress={() => createNewShoppingList(newShoppingListName)}
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