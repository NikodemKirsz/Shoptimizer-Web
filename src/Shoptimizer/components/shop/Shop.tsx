import { SectionHint, ShoppingShop } from "../../models/ShopModels";
import { useStyles } from "../../hooks";
import { LayoutChangeEvent, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { combine } from "../../logic/viewHelpers";
import { ReactNativeZoomableView as ZoomableView } from "@openspacelabs/react-native-zoomable-view";
import Floor from "./Floor";
import Shelf from "./Shelf";
import Checkout from "./Checkout";
import Road from "./Road";
import React, { useCallback, useEffect, useState } from "react";
import { RectDimensions } from "../../models/utility/RectDimensions";
import MyButton from "../MyButton";

type ShopProps = {
  shop: ShoppingShop;
}

function Shop(props: ShopProps) {
  const {shop, shop: {floor}} = props;
  const {color, style} = useStyles();

  const [containerDimensions, setContainerDimensions] = useState<RectDimensions>();
  const [sectionHint, setSectionHint] = useState<SectionHint | null>();

  const onLayoutChange = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setContainerDimensions({
      width: width,
      height: height,
    });
  }, [setContainerDimensions]);
  
  const hideSectionHint = useCallback(() => {
    setSectionHint(null)
  }, [setSectionHint]);
  
  return (
    <View
      style={combine(style.fullContainer, { padding: 16 })}
    >
      <ScrollView
        style={style.productHintView}
        contentContainerStyle={!!sectionHint ? style.productHintContainerView : style.hidden}
      >
        {sectionHint && (
          <TouchableOpacity
            onPress={hideSectionHint}
          >
            <View style={style.container}>
              <Text style={combine(style.text, { fontSize: 32 })}>{sectionHint.category}</Text>
            </View>
            {sectionHint.items.map((item, i) => (
              <Text key={i} style={combine(style.text, { fontSize: 20 })}>{item}</Text>
            ))}
          </TouchableOpacity>
        )}
      </ScrollView>
      <View
        style={combine(style.fullContainer, { height: "60%" })}
        onLayout={onLayoutChange}
      >
        <ZoomableView
          minZoom={0.5}
          maxZoom={4}
          initialZoom={1}
        >
          {containerDimensions && (
            <Floor
              floorDimensions={floor.floorDimensions}
              containerDimensions={containerDimensions}
            >
              {floor.shelves.map(shelf => (
                <Shelf
                  key={`ShopShelf-${shelf.id}`}
                  shelf={shelf}
                  floorDimensions={floor.floorDimensions}
                  onHint={setSectionHint}
                />
              ))}

              {floor.checkouts && floor.checkouts.map(checkout => (
                <Checkout
                  key={`ShopCheckout-${checkout.id}`}
                  checkout={checkout}
                  floorDimensions={floor.floorDimensions}
                />
              ))}

              {floor.roads && floor.roads.map(road => (
                <Road
                  key={`ShopRoad-${road.id}`}
                  road={road}
                  floorDimensions={floor.floorDimensions}
                  visible={false}
                />
              ))}
           </Floor>
          )}
        </ZoomableView>
      </View>
      <View
        style={combine(style.fullContainer, style.rowButtonContainer, { height: "10%" })}
      >
        <MyButton backgroundColor={"green"} iconType={"done"}/>
        <MyButton backgroundColor={"red"} iconType={"close"}/>
      </View>
    </View>
  );
}

export default Shop;