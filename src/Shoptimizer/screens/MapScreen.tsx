import { ReactNativeZoomableView as ZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useStyles } from "../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationData";
import Shelf from "../components/shop/Shelf";
import Floor from "../components/shop/Floor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RectDimensions } from "../models/utility/RectDimensions";
import { LayoutChangeEvent, View } from "react-native";
import MyButton from "../components/MyButton";
import { combine } from "../logic/viewHelpers";
import Checkout from "../components/shop/Checkout";
import Road from "../components/shop/Road";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

function MapScreen(props: Props) {
  const {style, color} = useStyles();

  const [containerDimensions, setContainerDimensions] = useState<RectDimensions>({ width: 0, height: 0 });
  const [floorDimensions, setFloorDimensions] = useState<RectDimensions>();

  useEffect(() => {
    setFloorDimensions({
      width: 440,
      height: 260,
    });
  }, []);
  
  const onLayoutChange = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setContainerDimensions({
      width: width,
      height: height,
    });
  }, []);

  return (
    <View
      style={combine(style.fullContainer, { padding: 16 })}
    >
      <View
        style={combine(style.fullContainer, { height: "90%" })}
        onLayout={onLayoutChange}
      >
        <ZoomableView
          minZoom={0.5}
          maxZoom={3}
          initialZoom={1}
        >
          {floorDimensions && (
            <Floor
              floorDimensions={floorDimensions}
              containerDimensions={containerDimensions}
            >
              <Shelf dimensions={{width: 20, height: 60}} position={{top: 0, left: 0}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 100}} position={{top: 60, left: 0}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 100}} position={{top: 160, left: 0}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 40}} position={{top: 60, left: 60}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 60}} position={{top: 140, left: 60}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 100}} position={{top: 60, left: 120}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 100}} position={{top: 60, left: 180}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 100}} position={{top: 60, left: 240}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 100}} position={{top: 60, left: 300}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 160}} position={{top: 60, left: 360}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 100}} position={{top: 20, left: 420}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 100}} position={{top: 120, left: 420}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 20, height: 40}} position={{top: 200, left: 120}} floorDimensions={floorDimensions}/>
              
              <Shelf dimensions={{width: 100, height: 20}} position={{top: 0, left: 60}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 120, height: 20}} position={{top: 0, left: 160}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 120, height: 20}} position={{top: 0, left: 320}} floorDimensions={floorDimensions}/>
              <Shelf dimensions={{width: 120, height: 20}} position={{top: 240, left: 20}} floorDimensions={floorDimensions}/>
              
              <Checkout dimensions={{width: 220, height: 20}} position={{top: 200, left: 140}} floorDimensions={floorDimensions}/>

              <Road dimensions={{width: 4, height: 220}} position={{top: 40, left: 398}} floorDimensions={floorDimensions}/>
              <Road dimensions={{width: 4, height: 140}} position={{top: 40, left: 338}} floorDimensions={floorDimensions}/>
              <Road dimensions={{width: 4, height: 140}} position={{top: 40, left: 278}} floorDimensions={floorDimensions}/>
              <Road dimensions={{width: 4, height: 140}} position={{top: 40, left: 218}} floorDimensions={floorDimensions}/>
              <Road dimensions={{width: 4, height: 140}} position={{top: 40, left: 158}} floorDimensions={floorDimensions}/>
              <Road dimensions={{width: 4, height: 180}} position={{top: 40, left: 98}} floorDimensions={floorDimensions}/>
              <Road dimensions={{width: 4, height: 180}} position={{top: 40, left: 38}} floorDimensions={floorDimensions}/>
              
              <Road dimensions={{width: 360, height: 4}} position={{top: 38, left: 40}} floorDimensions={floorDimensions}/>
              <Road dimensions={{width: 60, height: 4}} position={{top: 118, left: 40}} floorDimensions={floorDimensions}/>
              <Road dimensions={{width: 240, height: 4}} position={{top: 178, left: 100}} floorDimensions={floorDimensions}/>
              <Road dimensions={{width: 60, height: 4}} position={{top: 218, left: 40}} floorDimensions={floorDimensions}/>
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

export default MapScreen;