import { createDrawerNavigator } from "@react-navigation/drawer";
import ShoppingListCollectionScreen from "./ShoppingListCollectionScreen";
import SettingsScreen from "./SettingsScreen";
import MapScreen from "./MapScreen";
import { RootStackParamList } from "../models/NavigationData";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator<RootStackParamList>();
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen(props: Props) {
  return (
    <Drawer.Navigator initialRouteName="Shopping Lists">
      <Drawer.Screen name="Shopping Lists" component={ShoppingListCollectionScreen} options={{ title: "Listy zakupowe" }}/>
      <Drawer.Screen name="Map" component={MapScreen} options={{ title: "Mapa" }}/>
      <Drawer.Screen name="Settings" component={SettingsScreen}  options={{ title: "Ustawienia" }}/>
    </Drawer.Navigator>
  );
}

export default HomeScreen;