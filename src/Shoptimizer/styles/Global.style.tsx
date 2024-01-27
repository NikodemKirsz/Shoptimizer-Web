import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { GlobalColors } from "./Themes/Themes";

type Style = ViewStyle | TextStyle;

const fullSize: Style = {
  width: "100%",
  height: "100%",
};

const fullContainer: Style = {
  ...fullSize,
  alignItems: "center",
};

const fullRow: Style = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
};

const cardButtonsContainer: Style = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 8,
};

const getStyles = (colors: GlobalColors) => ({
  color: colors,
  style: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    containerPadded8: {
      flex: 1,
      alignItems: 'center',
      padding: 8,
    },
    fullContainer: fullContainer,
    fullContainerPad16: {
      ...fullContainer,
      padding: 16,
    },
    input: {
      height: "100%",
      padding: 8,
      borderColor: colors.background,
      borderWidth: 2,
    },
    button: {
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonIcon: {
      width: '50%',
      height: '50%',
    },
    shoppingList: {
      flex: 1,
      flexDirection: 'column',
    },
    maxWidth: {
      width: "100%",
    },
    itemList: {
      flex: 1,
      margin: 14,
    },
    card: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "space-between",
      width: '100%',
      height: "auto",
      borderRadius: 16,
      backgroundColor: colors.listItem,
      marginTop: 10,
      marginHorizontal: "auto",
      padding: 10,
    },
    text: {
      fontSize: 24,
      color: colors.text,
    },
    text16: {
      fontSize: 16,
      color: colors.text,
    },
    text18: {
      fontSize: 18,
      color: colors.text,
    },
    text20: {
      fontSize: 20,
      color: colors.text,
    },
    text32: {
      fontSize: 32,
      color: colors.text,
    },
    subText: {
      fontSize: 16,
      color: colors.subText,
    },
    subText12: {
      fontSize: 12,
      color: colors.subText,
    },
    categoryTitleText: {
      fontSize: 28,
      color: colors.text,
      fontStyle: "italic",
      textAlign: "center",
    },
    titleContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: "center",
    },
    cardTextContainer: {
      width: "auto",
      height: "auto",
      flexShrink: 1,
      overflow: "visible",
      justifyContent: 'center',
      marginRight: 5,
    },
    headerButtonsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    cardButtonsContainerWidth70: {
      ...cardButtonsContainer,
      width: 70,
    },
    cardButtonsContainerWidth116: {
      ...cardButtonsContainer,
      width: 116,
    },
    rowButtonContainer: {
      ...fullRow,
      justifyContent: "space-evenly",
      borderRadius: 4,
    },
    rowItemsContainer: {
      ...fullRow,
      gap: 4,
    },
    rowItemsContainerGap12: {
      ...fullRow,
      gap: 12,
    },
    subtitleTextsContainer: {
      ...fullRow,
      justifyContent: "center",
      gap: 16,
    },
    amounterContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.background,
    },
    amounterButton: {
      width: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.buttonBackground,
      borderRadius: 4,
    },
    amounterText: {
      width: 40,
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    modalBackground: {
      height: "100%",
    },
    modalView: {
      position: "absolute",
      alignItems: 'center',
      width: "90%",
      height: "auto",
      marginHorizontal: "5%",
      overflow: "hidden",
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: colors.darkerListItem,
      elevation: 5,
    },
    autocompleteDropdown: {
      maxHeight: "92%",
      width: "100%",
      marginTop: 16,
      backgroundColor: colors.listItem,
      borderRadius: 16,
    },
    autocompleteListItem: {
      padding: 8,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.background
    },
    scrollExtendedView: {
      paddingBottom: "100%",
    },
    productHintView: {
      width: "96%",
      flex: 1,
    },
    shopContainerView: {
      width: "100%",
      flex: 3,
    },
    productHintContainerView: {
      padding: 8,
      backgroundColor: colors.listItem,
    },
    hidden: {
      display: "none",
    },
    fullSize: {
      ...fullSize,
    },
    headerButton: {
      marginRight: 0,
    },
    margin8: {
      margin: 8,
    },
    margin20: {
      margin: 20,
    }
  })
});

export default getStyles;