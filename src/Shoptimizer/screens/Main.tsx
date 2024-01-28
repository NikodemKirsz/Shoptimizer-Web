import { NavigationContainer } from "@react-navigation/native";
import DarkTheme from "../styles/Themes/DarkTheme";
import LightTheme from "../styles/Themes/LightTheme";
import HomeScreen from "./HomeScreen";
import ShoppingListScreen from "./ShoppingListScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationData";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Main() {
  const {isDarkTheme, setIsDarkTheme} = useContext(ThemeContext);
  
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: "Strona główna" }}/>
        <Stack.Screen name="Shopping List" component={ShoppingListScreen} options={{ title: "Lista zakupowa" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;