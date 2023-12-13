import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type DeconstructedProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName, undefined>;
  route: RouteProp<ParamList, RouteName>;
  params: ParamList[RouteName];
}

export default DeconstructedProps;