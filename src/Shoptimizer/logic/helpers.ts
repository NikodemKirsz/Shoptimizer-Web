import { ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase, RouteProp } from "@react-navigation/native";

export function pad(obj: any, count = 2, char = '0', start = true) {
  const str: string = typeof obj === 'string' ? obj : String(obj);
  return start
    ? str.padStart(count, char)
    : str.padEnd(count, char);
}
export function refreshPage() {
  window.location.reload();
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clamp(val: number, min: number, max: number) {
  if (val <= min)
    return min;
  if (val >= max)
    return max;
  
  return val;
}

export function isNullOrWhitespace(str: string | undefined | null): boolean {
  if (!str)
    return true;
  
  return !str.trim();
}

export function trimmedOrNull(str: string | undefined | null): string | null {
  return isNullOrWhitespace(str)
    ? null
    : str!.trim();
}

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

type DeconstructedProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName, undefined>;
  route: RouteProp<ParamList, RouteName>;
  params: ParamList[RouteName];
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