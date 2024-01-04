import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import ShoppingListScreen from "./screens/ShoppingListScreen";
import { useState } from "react";
import DarkTheme from "./styles/Themes/DarkTheme";
import LightTheme from "./styles/Themes/LightTheme";
import HomeScreen from "./screens/HomeScreen";
import { LogBox } from 'react-native';
import { RootStackParamList } from "./models/NavigationData";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "(imported as 'Animated') was not found in 'react-native-reanimated'",
  "StyleSheet.compose(a, b) is deprecated; use array syntax, i.e., [a,b]."
]);

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Shopping List" component={ShoppingListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
