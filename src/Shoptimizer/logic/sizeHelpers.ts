import { RectDimensions, RectPosition } from "../models/utility/RectDimensions";
import { DimensionValue } from "react-native";

export function calculateRelativeValues(
  dimensions: RectDimensions,
  position: RectPosition,
  floorDimensions: RectDimensions
): [RectDimensions, RectPosition] {
  return [
    {
      width: dimensions.width / floorDimensions.width,
      height: dimensions.height / floorDimensions.height,
    },
    {
      top: position.top / floorDimensions.height,
      left: position.left / floorDimensions.width,
    }
  ];
}

export function toProc(val: number): DimensionValue {
  return`${val * 100}%`;
}