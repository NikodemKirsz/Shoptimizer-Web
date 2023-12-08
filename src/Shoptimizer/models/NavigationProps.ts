import { NavigationProp, Route } from "@react-navigation/native";

type Keyof<T extends {}> = Extract<keyof T, string>;

interface NavigationProps<
  Params extends {},
  RouteName extends keyof Params = Keyof<Params>,
> {
  navigation: NavigationProp<Params, RouteName>;
  route: Route<RouteName, Params>;
}

export default NavigationProps;