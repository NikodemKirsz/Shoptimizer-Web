import { ColorValue } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type KnownIcons =
  "done" |
  "close" |
  "remove" |
  "add" |
  "search"
;

interface IconProps {
  name: KnownIcons;
  size: number;
  color: ColorValue;
}

function Icon(props: IconProps) {
  return (
    <MaterialIcons
      name={props.name}
      size={props.size}
      color={props.color}
    />
  );
}

export { Icon, type KnownIcons };