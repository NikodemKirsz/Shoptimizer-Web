import { Theme } from "@react-navigation/native";

interface GlobalColors {
  primary: string,
  background: string,
  card: string,
  listItem: string,
  text: string,
  subText: string,
  border: string,
  notification: string,
  placeholder: string,
  descriptionText: string,
  buttonBackground: string,
  transparent: string,
}

interface GlobalTheme extends Theme {
  dark: boolean,
  colors: GlobalColors,
} 

export type { GlobalTheme, GlobalColors };
