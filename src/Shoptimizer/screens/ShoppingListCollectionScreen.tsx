import {
  ActivityIndicator,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  View
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { ShoppingListPreview } from "../models/ShoppingList";
import { getShoppingListPreview } from "../models/FakeData";
import { useStyles } from "../hooks";
import MyButton from "../components/MyButton";
import MyModal from "../components/MyModal";
import { combine, deconstructProps, trimmedOrNull } from "../logic/helpers";
import { RootStackParamList } from "../models/NavigationData";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MyPressable from "../components/MyPressable";

type Props = NativeStackScreenProps<RootStackParamList, "Shopping Lists">;

function ShoppingListCollectionScreen(props: Props) {
  const {navigation, route} = deconstructProps(props);
  const {style, color} = useStyles();
  
  const [shoppingListPreviews, setShoppingListPreviews] = useState<ShoppingListPreview[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newShoppingListName, setNewShoppingListName] = useState<string>("");
  
  useEffect(() => {
    setShoppingListPreviews([1, 2, 3, 4, 5].map(getShoppingListPreview));
  }, [setShoppingListPreviews]);

  useEffect(() => {
    navigation.setOptions({
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
  }, [navigation]);
  
  const deleteShoppingList = useCallback(async (id: number) => {
    setShoppingListPreviews(
      old => old.filter(shoppingList => shoppingList.id != id)
    );
  }, [setShoppingListPreviews]);

  const archiveShoppingList = useCallback(async (id: number) => {
    
  }, []);
  
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
    const normalizedName = trimmedOrNull(name);
  }, []);
  
  return (
    <>
      <ScrollView>
        {shoppingListPreviews ? (
          shoppingListPreviews.map(shoppingList =>
            <MyPressable
              key={`ShoppingListCollectionItem-${shoppingList.id}`}
              style={style.card}
              onPress={() => navigation.navigate({
                name: "Shopping List",
                params: {
                  shoppingListPreview: shoppingList,
                },
              })}
              disabled={shoppingList.archived && false}
            >
              <View style={style.cardTextContainer}>
                <Text style={style.text}>{shoppingList.name}</Text>
                <Text style={style.subText}>{shoppingList.dateCreated.toString(false)}  #{shoppingList.id}</Text>
              </View>
              <View style={combine(style.cardButtonsContainer, { width: 70 })}>
                <MyButton
                  backgroundColor={'orange'}
                  iconType={'done'}
                  size={34}
                  onPress={() => archiveShoppingList(shoppingList.id)}
                />
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
        <View style={{width: '100%', justifyContent: "space-between"}}>
          <View style={{width: '100%'}}>
            <TextInput
              style={combine(style.input, style.text, { fontSize: 20 })}
              value={newShoppingListName}
              onChange={onNewNameChange}
              placeholder={"Wpisz nazwę listy zakupowej"}
              placeholderTextColor={color.placeholder}
            />
          </View>
          <View style={combine(style.rowButtonContainer, { marginTop: 8 })}>
            <MyButton
              size={40}
              backgroundColor={"green"}
              iconType={"done"}
              onPress={() => createNewShoppingList(newShoppingListName)}
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