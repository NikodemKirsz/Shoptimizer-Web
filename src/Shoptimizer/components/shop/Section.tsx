import { ShelfSection } from "../../models/ShopModels";
import { TouchableOpacity, View, Text } from "react-native";
import { combine } from "../../logic/viewHelpers";
import { useStyles } from "../../hooks";
import { Attributes, useCallback } from "react";

interface ShelfProps extends Attributes {
  section: ShelfSection;
  onHint: (sectionHint: ShelfSection) => void;
}

function Section(props: ShelfProps) {
  const {section, section: {number, shoppingProducts, categoryName, size, skip}, onHint} = props;
  const {color, style} = useStyles();
  
  const showHints = useCallback(() => {
    onHint(section);
  }, [onHint, shoppingProducts, categoryName]);
  
  return (
    <>
      {skip > 0 && (
        <View
          key={`SectionSkip-${number}`}
          style={{ flex: skip }}
        />
      )}
      <TouchableOpacity
        key={`Section-${number}`}
        style={combine(
          { flex: size },
          shoppingProducts.length > 0 && { backgroundColor: color.lightAccent },
        )}
        onPress={showHints}
      />
    </>
  );
}

export default Section;