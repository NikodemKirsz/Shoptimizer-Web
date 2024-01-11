import { ColorValue } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type KnownIcons =
  "done" |
  "close" |
  "remove" |
  "add" |
  "search" | 
  "list" |
  "map" |
  "refresh";

type IconDict = {
  [K in KnownIcons]: string
};

const iconDict: IconDict = {
  "done": "done",
  "close": "close",
  "remove": "remove",
  "add": "add",
  "search": "search",
  "list": "receipt-long",
  "map": "navigation",
  "refresh": "refresh",
};

interface IconProps {
  name: KnownIcons;
  size: number;
  color: ColorValue;
}

function Icon(props: IconProps) {
  return (
    <MaterialIcons
      name={iconDict[props.name]}
      size={props.size}
      color={props.color}
    />
  );
}

export { Icon, type KnownIcons };