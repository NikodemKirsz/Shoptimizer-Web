import {
  ColorValue,
  GestureResponderEvent,
  Text,
  AnimatableNumericValue,
  View, StyleProp, ViewStyle,
} from "react-native";
import { useStyles } from "../hooks";
import { Icon, KnownIcons } from "./Icon";
import { combine } from "../logic/helpers";
import React from "react";
import MyPressable from "./MyPressable";

type IconType = "none" | "text" | KnownIcons;

interface MyButtonProps {
  size?: number | [width: number, height: number];
  backgroundColor: ColorValue;
  tintColor?:  ColorValue;
  opacity?: AnimatableNumericValue;
  iconType: IconType;
  text?: string | null;
  onPress?: ((event: GestureResponderEvent) => void);
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const MyButton = (props: MyButtonProps) => {
  let {
    backgroundColor,
    tintColor,
    opacity,
    size,
    text,
    iconType,
    onPress,
    disabled,
    containerStyle,
  } = props;
  const {style, color} = useStyles()
  
  size ??= 30;
  opacity ??= 1;
  tintColor ??= color.text;
  disabled ??= false;
  
  const normalizedSize: [number, number] = size instanceof Array
    ? [size[0], size[1]]
    : [size, size];
  
  const minSize = Math.min(...normalizedSize);

  if (disabled)
    backgroundColor = 'grey';
  
  const renderInsides = (type: IconType) => {
    switch (type) {
      case "none": return;
      case "text": return text && <Text>{text}</Text>;
      default: return <Icon name={type} size={minSize * 0.7} color={tintColor!} />;
    }
  };
  
  return (
    <MyPressable
      style={combine(style.button, containerStyle, {
        width: normalizedSize[0],
        height: normalizedSize[1],
        borderRadius: minSize * 0.4,
        backgroundColor: backgroundColor,
        opacity: opacity,
      })}
      onPress={onPress}
      disabled={disabled}
    >
      <View>
        {renderInsides(iconType)}
      </View>
    </MyPressable>
  );
} 

export default MyButton;