import { SectionHint, ShelfSection } from "../../models/ShopModels";
import { TouchableOpacity, View, Text } from "react-native";
import { combine } from "../../logic/viewHelpers";
import { useStyles } from "../../hooks";
import { Attributes, useCallback } from "react";

interface ShelfProps extends Attributes {
  section: ShelfSection;
  onHint: (sectionHint: SectionHint | null) => void;
}

function Section(props: ShelfProps) {
  const {section: {id, items, name, size, skip}, onHint} = props;
  const {color, style} = useStyles();
  
  const showHints = useCallback(() => {
    const sectionHint: SectionHint = {
      category: name,
      items: items,
    }
    onHint(sectionHint);
  }, []);
  
  return (
    <>
      {skip > 0 && (
        <View
          key={`SectionSkip-${id}`}
          style={{ flex: skip }}
        />
      )}
      <TouchableOpacity
        key={`Section-${id}`}
        style={combine(
          { flex: size },
          items.length > 0 && { backgroundColor: color.lightAccent },
        )}
        onPress={showHints}
      />
    </>
  );
}

export default Section;