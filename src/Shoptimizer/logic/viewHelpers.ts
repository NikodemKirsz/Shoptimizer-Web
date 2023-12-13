import { ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DeconstructedProps from "../models/utility/DeconstructedProps";

export function combine(
  ...styles: (StyleProp<ViewStyle> | StyleProp<TextStyle> | StyleProp<ImageStyle>)[]
): StyleProp<ViewStyle | TextStyle | ImageStyle> {
  if (styles.length < 1)
    return {};

  if (styles.length == 1)
    return styles[0];

  const [first, ...rest] = styles;
  return StyleSheet.compose(first, rest);
}

export function deconstructProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
>(props: NativeStackScreenProps<ParamList, RouteName>): DeconstructedProps<ParamList, RouteName> {
  return {
    navigation: props.navigation,
    route: props.route,
    params: props.route.params,
  } as DeconstructedProps<ParamList, RouteName>;
}