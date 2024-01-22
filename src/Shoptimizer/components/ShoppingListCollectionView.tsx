import MyPressable from "./MyPressable";
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from "react-native";
import { combine } from "../logic/viewHelpers";
import DateOnly from "../models/DateOnly";
import MyButton from "./MyButton";
import { useStyles } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import { ShoppingListPreview } from "../models/ShoppingList";
import { Backend } from "../logic/backend";

type Props = {
  onShoppingListPress: (shoppingList: ShoppingListPreview) => void | Promise<void>;
  refreshListToggle?: boolean;
  readonly?: boolean;
  includeArchived?: boolean;
}

function ShoppingListCollectionView(props: Props) {
  const {color, style} = useStyles();
  let {onShoppingListPress, refreshListToggle, readonly, includeArchived} = props;

  refreshListToggle ??= true;
  readonly ??= true;
  includeArchived ??= true;

  const [shoppingListPreviews, setShoppingListPreviews] = useState<ShoppingListPreview[]>();
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setRefreshing(true);
      setShoppingListPreviews(undefined);
      const shoppingListsResponse = await Backend.getShoppingListPreviewsForUser(
        1,
        includeArchived!,
        abortController.signal
      );
      setShoppingListPreviews(shoppingListsResponse.data);
      setRefreshing(false);
    })()
      .catch(console.warn);

    return () => abortController.abort();
  }, [refreshToggle, refreshListToggle]);

  const deleteShoppingList = useCallback(async (id: number) => {
    setShoppingListPreviews(
      old => old?.filter(shoppingList => shoppingList.id != id)
    );

    await Backend.deleteShoppingList(id);
  }, [setShoppingListPreviews]);

  const archiveShoppingList = useCallback(async (id: number) => {
    setShoppingListPreviews(
      old => old?.update(
        shoppingList => shoppingList.id === id,
        element => element.archived = true
      )
    );

    await Backend.archiveShoppingList(id);
  }, [setShoppingListPreviews]);

  const onRefresh = useCallback(() => setRefreshToggle(old => !old), [setRefreshToggle]);

  const archivedCardStyle = combine(style.card, {opacity: 0.6});

  return (
    <ScrollView
      style={style.scrollExtendedView}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["green"]}/>}
    >
      {shoppingListPreviews ? (
        shoppingListPreviews.length > 0 ? (
          shoppingListPreviews.map(shoppingList =>
            <MyPressable
              key={`ShoppingListCollectionItem-${shoppingList.id}`}
              style={!shoppingList.archived ? style.card : archivedCardStyle}
              onPress={() => onShoppingListPress(shoppingList)}
            >
              <View style={style.cardTextContainer}>
                <Text style={style.text}>{shoppingList.name}</Text>
                <View style={style.rowItemsContainerGap12}>
                  <Text style={style.subText}>{new DateOnly(shoppingList.dateCreated).toString(false)}</Text>
                  <Text style={style.subText}>#{shoppingList.id}</Text>
                  <Text style={style.subText}>Produktów: {shoppingList.itemsCount}</Text>
                </View>
              </View>
              <View style={style.cardButtonsContainerWidth70}>
                {!readonly && (
                  <>
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
                  </>
                )}
              </View>
            </MyPressable>
          )
        ) : (
          <View style={style.fullContainerPad16}>
            <Text style={style.text18}>Nie masz jeszcze żadnej listy zakupowej</Text>
          </View>
        )
      ) : (
        <ActivityIndicator style={style.margin20} size={"large"}/>
      )}
    </ScrollView>
  );
}

export default ShoppingListCollectionView;