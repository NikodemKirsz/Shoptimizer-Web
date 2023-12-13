import { StyleSheet } from "react-native";
import { GlobalColors } from "./Themes/Themes";

const getStyles = (colors: GlobalColors) => ({
  color: colors,
  style: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    fullContainer: {
      alignItems: 'center',
      width: "100%",
      height: "100%",
    },
    input: {
      padding: 8,
      borderColor: colors.background,
      borderWidth: 2,
    },
    headerButton: {
      flex: 1,
      backgroundColor: "#888888",
      alignItems: 'center',
      justifyContent: 'center',
      height: '80%',
      padding: 16,
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
    subText: {
      fontSize: 16,
      color: colors.subText,
    },
    titleContainer: {
      width: '100%',
      alignItems: 'center',
    },
    cardTextContainer: {
      width: "auto",
      height: "auto",
      overflow: "visible",
      justifyContent: 'center',
      marginRight: 5,
    },
    cardButtonsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    rowButtonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: "space-evenly",
      borderRadius: 4,
    },
    rowItemsContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
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
      flex: 1,
      backgroundColor: '#141a1fA0',
    },
    modalView: {
      alignItems: 'center',
      margin: 16,
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: colors.listItem,
      elevation: 5,
    },
  })
});

export default getStyles;