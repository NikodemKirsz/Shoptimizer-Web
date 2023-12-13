import { useStyles } from "../../hooks";
import { ReactNode, useCallback, useMemo } from "react";
import { View } from "react-native";
import { RectDimensions } from "../../models/utility/RectDimensions";

interface FloorProps {
  floorDimensions: RectDimensions;
  containerDimensions: RectDimensions;
  children?: ReactNode | undefined;
}

function Floor(props: FloorProps) {
  const {floorDimensions, containerDimensions, children} = props;
  const {style, color} = useStyles();
  
  const calculateAbsoluteDimensions = useCallback((container: RectDimensions, floor: RectDimensions) => {
    const floorRatio = floor.width / floor.height;
    const windowRatio = container.width / container.height;

    return floorRatio > windowRatio
      ? [container.width, floor.height * (container.width / floor.width)]
      : [floor.width * (container.height / floor.height), container.height];
  }, []);

  const [absoluteWidth, absoluteHeight] = useMemo(() => {
    return calculateAbsoluteDimensions(containerDimensions, floorDimensions);
  }, [containerDimensions.width, containerDimensions.height, floorDimensions.width, floorDimensions.height]);

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
    </View>
  );
}

export default Floor;