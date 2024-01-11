import { Attributes, Key, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../../hooks";
import {
  Orientation,
  RectDimensions,
  RectDimensionsExtended,
  RectPosition,
  RectPositionExtended
} from "../../models/utility/RectDimensions";
import { calculateOrientation, calculateRelativeValues, toProc } from "../../logic/sizeHelpers";
import { combine } from "../../logic/viewHelpers";
import { ShelfSection, ShopShelf } from "../../models/ShopModels";
import Section from "./Section";


interface ShelfProps extends Attributes {
  shelf: ShopShelf;
  floorDimensions: RectDimensions;
  onHint: (sectionHint: ShelfSection) => void;
}

function Shelf(props: ShelfProps) {
  const {shelf: { number, dimensions, position, sections }, floorDimensions, onHint} = props;
  const {style, color} = useStyles();
  
  const isVertical: boolean = useMemo(() => {
    return calculateOrientation(dimensions) == Orientation.Vertical;
  }, [dimensions.width, dimensions.height]);
  
  const [dimensionsPercent, positionPercent] = useMemo((): [RectDimensionsExtended, RectPositionExtended] => {
    const [relativeDimensions, relativePosition] = calculateRelativeValues(dimensions, position, floorDimensions);
    
    return [{
        width: toProc(relativeDimensions.width),
        height: toProc(relativeDimensions.height),
      }, {
        top: toProc(relativePosition.top),
        left: toProc(relativePosition.left),
      }];
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
        flexDirection: isVertical ? "column" : "row",
        gap: 2,
        overflow: "visible",
        backgroundColor: color.listItem,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: color.card,
        width: dimensionsPercent.width,
        height: dimensionsPercent.height,
        left: positionPercent.left,
        top: positionPercent.top,
      }}
    >
      {false && <Text style={combine(style.text, { alignSelf: "center", fontSize: 18 })}>{number}</Text>}
      {sections.length > 0 && sections.map((section) => (
        <Section
          key={`ShelfSection-${section.number}`}
          section={section}
          onHint={onHint}
        />
      ))}
    </View>
  );
}

export default Shelf;