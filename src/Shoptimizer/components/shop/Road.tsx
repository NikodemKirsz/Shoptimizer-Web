import {
  RectDimensions,
  RectDimensionsExtended,
  RectPosition,
  RectPositionExtended
} from "../../models/utility/RectDimensions";
import { useStyles } from "../../hooks";
import { useMemo } from "react";
import { calculateRelativeValues, toProc } from "../../logic/sizeHelpers";
import { View } from "react-native";

interface RoadProps {
  dimensions: RectDimensions;
  position: RectPosition;
  floorDimensions: RectDimensions;
  visible?: boolean;
}

function Road(props: RoadProps) {
  let {dimensions, position, floorDimensions, visible} = props;
  const {style, color} = useStyles();

  visible ??= true;

  const [dimensionsPercent, positionPercent] = useMemo((): [RectDimensionsExtended, RectPositionExtended] => {
    const [relativeDimensions, relativePosition] = calculateRelativeValues(dimensions, position, floorDimensions);

    return [
      {
        width: toProc(relativeDimensions.width),
        height: toProc(relativeDimensions.height),
      },
      {
        top: toProc(relativePosition.top),
        left: toProc(relativePosition.left),
      }
    ]
  },[
    dimensions.width,
    dimensions.height,
    position.top,
    position.left,
    floorDimensions.width,
    floorDimensions.height,
  ]);

  return (
    <View
      style={{
        position: "absolute",
        overflow: "hidden",
        backgroundColor: color.primary,
        borderRadius: 4,
        width: dimensionsPercent.width,
        height: dimensionsPercent.height,
        left: positionPercent.left,
        top: positionPercent.top,
      }}
    />
  );
}

export default Road;