import { ShelfSection, ShoppingShop } from "../../models/ShopModels";
import { useStyles } from "../../hooks";
import { LayoutChangeEvent, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { combine } from "../../logic/viewHelpers";
import { ReactNativeZoomableView as ZoomableView } from "@openspacelabs/react-native-zoomable-view";
import Floor from "./Floor";
import Shelf from "./Shelf";
import Checkout from "./Checkout";
import Road from "./Road";
import React, { useCallback, useEffect, useState } from "react";
import { RectDimensions } from "../../models/utility/RectDimensions";

type ShopProps = {
  shop: ShoppingShop;
}

function Shop(props: ShopProps) {
  const {shop: {id, floor}} = props;
  const {color, style} = useStyles();

  const [containerDimensions, setContainerDimensions] = useState<RectDimensions>();
  const [selectedSection, setSelectedSection] = useState<ShelfSection | null>(null);

  const onLayoutChange = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setContainerDimensions({
      width: width,
      height: height,
    });
  }, [setContainerDimensions]);
  
  const hideSectionHint = useCallback(() => {
    setSelectedSection(null)
  }, [id, setSelectedSection]);
  
  return (
    <View
      style={combine(style.fullContainer, { padding: 16 })}
    >
      <ScrollView
        style={style.productHintView}
        contentContainerStyle={!!selectedSection ? style.productHintContainerView : style.hidden}
      >
        {selectedSection && (
          <TouchableOpacity
            onPress={hideSectionHint}
          >
            <View style={style.container}>
              <Text style={combine(style.text, { fontSize: 32 })}>{selectedSection.categoryName}</Text>
            </View>
            {selectedSection.shoppingProducts.map((item, i) => (
              <Text key={i} style={combine(style.text, { fontSize: 20 })}>{item.name}</Text>
            ))}
          </TouchableOpacity>
        )}
      </ScrollView>
      <View
        style={combine(style.fullContainer, { height: "80%" })}
        onLayout={onLayoutChange}
      >
        <ZoomableView
          minZoom={0.5}
          maxZoom={3}
          initialZoom={1}
        >
          {containerDimensions && (
            <Floor
              floorDimensions={floor.dimensions}
              containerDimensions={containerDimensions}
            >
              {floor.shelves.map(shelf => (
                <Shelf
                  key={`ShopShelf-${shelf.number}`}
                  shelf={shelf}
                  floorDimensions={floor.dimensions}
                  onHint={setSelectedSection}
                />
              ))}

              {floor.checkouts && floor.checkouts.map(checkout => (
                <Checkout
                  key={`ShopCheckout-${checkout.number}`}
                  checkout={checkout}
                  floorDimensions={floor.dimensions}
                />
              ))}

              {floor.roads && floor.roads.map(road => (
                <Road
                  key={`ShopRoad-${road.number}`}
                  road={road}
                  floorDimensions={floor.dimensions}
                  visible={false}
                />
              ))}
           </Floor>
          )}
        </ZoomableView>
      </View>
    </View>
  );
}

export default Shop;