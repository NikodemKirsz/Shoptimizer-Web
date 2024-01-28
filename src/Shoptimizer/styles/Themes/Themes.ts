import { Theme } from "@react-navigation/native";
import { ColorValue } from "react-native";

interface GlobalColors {
  primary: string,
  background: string,
  card: string,
  listItem: ColorValue,
  darkerListItem: ColorValue,
  text: string,
  subText: ColorValue,
  border: string,
  notification: string,
  placeholder: ColorValue,
  descriptionText: ColorValue,
  buttonBackground: ColorValue,
  strongAccent: ColorValue,
  lightAccent: ColorValue,
  transparent: ColorValue,
}

interface GlobalTheme extends Theme {
  dark: boolean,
  colors: GlobalColors,
} 

export type { GlobalTheme, GlobalColors };
