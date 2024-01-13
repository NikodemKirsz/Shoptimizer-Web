import { Text, View } from "react-native";
import { useStyles } from "../hooks";
import { Icon } from "../components/Icon";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationData";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

function SettingsScreen(props: Props) {
  const {style, color} = useStyles();

  return (
    <View style={style.container}>
      <Text>Settings</Text>
      <Icon name={"close"} size={40} color={'white'}/>
      <Icon name={"add"} size={40} color={'white'}/>
      <Icon name={"done"} size={40} color={'white'}/>
      <Icon name={"remove"} size={40} color={'white'}/>
    </View>
  );
}

export default SettingsScreen;