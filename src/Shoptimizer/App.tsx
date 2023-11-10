import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ShoppingListScreen } from "./screens/ShoppingListScreen";
import { MapScreen } from "./screens/MapScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Shopping List" component={ShoppingListScreen} />
        <Drawer.Screen name="Map" component={MapScreen} />
        <Drawer.Screen name="Setting" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
