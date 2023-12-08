import { View, Text, DimensionValue } from "react-native";
import { useStyles } from "../../hooks";
import { combine } from "../../logic/helpers";
import { useCallback } from "react";

interface ShelfProps {
  name?: string | undefined;
  width: number;
  height: number;
  left: number;
  top: number;
}

function Shelf(props: ShelfProps) {
  const {height, left, name, top, width} = props;
  const {style, color} = useStyles();
  
  const toPercent = useCallback((val: number): DimensionValue => `${val}%`, []);
  
  return (
    <View
      style={{
        position: "absolute",
        overflow: "hidden",
        backgroundColor: color.listItem,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: color.card,
        width: toPercent(width),
        height: toPercent(height),
        left: toPercent(left),
        top: toPercent(top),
    }}
    >
      {name && (
        <Text style={combine(style.text, { fontSize: 12 })}>{name}</Text>
      )}
    </View>
  );
}

export default Shelf;