import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import ShoppingListScreen from "./screens/ShoppingListScreen";
import { useState } from "react";
import DarkTheme from "./styles/Themes/DarkTheme";
import LightTheme from "./styles/Themes/LightTheme";
import HomeScreen from "./screens/HomeScreen";
import { LogBox } from 'react-native';
import { RootStackParamList } from "./models/NavigationData";
import { enableScreens } from "react-native-screens";
import { registerExtensions } from "./logic/extensions";

registerExtensions();

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "(imported as 'Animated') was not found in 'react-native-reanimated'",
  "StyleSheet.compose(a, b) is deprecated; use array syntax, i.e., [a,b]"
]);

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
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
