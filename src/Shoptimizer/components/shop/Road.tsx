import {
  RectDimensions,
  RectDimensionsExtended,
  RectPositionExtended
} from "../../models/utility/RectDimensions";
import { useStyles } from "../../hooks";
import React, { useMemo } from "react";
import { calculateRelativeValues, toProc } from "../../logic/sizeHelpers";
import { View } from "react-native";
import { ShopRoad } from "../../models/ShopModels";

interface RoadProps {
  road: ShopRoad;
  floorDimensions: RectDimensions;
  visible?: boolean;
}

function Road(props: RoadProps) {
  let {road: {position, dimensions}, floorDimensions, visible} = props;
  const {style, color} = useStyles();

  visible ??= true;
  
  if (!visible)
    return <></>;

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