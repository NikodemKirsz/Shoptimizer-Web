import { useStyles } from "../../hooks";
import { useMemo } from "react";
import {
  RectDimensions,
  RectDimensionsExtended,
  RectPosition,
  RectPositionExtended
} from "../../models/utility/RectDimensions";
import { calculateRelativeValues, toProc } from "../../logic/sizeHelpers";
import { Text, View } from "react-native";
import { combine } from "../../logic/viewHelpers";

interface CheckoutProps {
  dimensions: RectDimensions;
  position: RectPosition;
  floorDimensions: RectDimensions;
}

function Checkout(props: CheckoutProps) {
  const {dimensions, position, floorDimensions} = props;
  const {style, color} = useStyles();

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
        backgroundColor: color.listItem,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: color.strongAccent,
        width: dimensionsPercent.width,
        height: dimensionsPercent.height,
        left: positionPercent.left,
        top: positionPercent.top,
      }}
    />
  );
}

export default Checkout;