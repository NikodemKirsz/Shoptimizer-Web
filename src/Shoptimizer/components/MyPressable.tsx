import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { combine } from "../logic/helpers";

interface MyPressableProps extends Omit<PressableProps, "style"> {
  style: StyleProp<ViewStyle>;
}

function MyPressable(props: MyPressableProps) {
  const {style, children} = props;
  
  return (
    <Pressable
      {...props}
      style={(state) => state.pressed ? combine(style, { opacity: 0.3 }) : style}
    >
      {children}
    </Pressable>
  );
}

export default MyPressable;