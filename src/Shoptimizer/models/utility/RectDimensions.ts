import { DimensionValue } from "react-native";

export type RectDimensions = {
  width: number;
  height: number;
}

export type RectDimensionsExtended = {
  width: number | DimensionValue;
  height: number | DimensionValue;
}

export type RectPosition = {
  top: number;
  left: number;
}

export type RectPositionExtended = {
  top: number | DimensionValue;
  left: number | DimensionValue;
}