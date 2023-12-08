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
    <Drawer.Navigator initialRouteName="Map">
      <Drawer.Screen name="Shopping Lists" component={ShoppingListCollectionScreen}/>
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default HomeScreen;