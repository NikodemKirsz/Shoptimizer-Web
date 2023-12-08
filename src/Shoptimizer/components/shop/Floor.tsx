import { useStyles } from "../../hooks";
import { ReactNode, useEffect, useMemo } from "react";
import { Dimensions, useWindowDimensions, View } from "react-native";
import MyButton from "../MyButton";

interface FloorProps {
  width: number;
  height: number;
  children?: ReactNode | undefined;
}

function Floor(props: FloorProps) {
  const {width, height, children} = props;
  const {style, color} = useStyles();
  
  const window = useWindowDimensions();

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", calculateThings);
    return subscription.remove();
  }, []);

  const calculateThings = () => {
    const windowRatio = window.width / window.height;
    const floorRatio = width / height;

    return floorRatio < windowRatio
      ? [window.width, (window.height * height) / window.width]
      : [(window.width * width) / window.height, window.height];
  }

  const [absoluteWidth, absoluteHeight] = useMemo(() => {
    return calculateThings();
  }, [window.width, window.height, window.scale, width, height]);

  return (
    <View
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: color.background,
        borderWidth: 4,
        borderStyle: "solid",
        borderColor: color.card,
        width: absoluteWidth,
        height: absoluteHeight,
      }}
    >
      {!!children && children}
      <MyButton backgroundColor={"red"} iconType={"close"} onPress={() => console.log("Window", window)}/>
    </View>
  );
}

export default Floor;