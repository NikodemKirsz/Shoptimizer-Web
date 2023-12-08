import { ReactNativeZoomableView as ZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useStyles } from "../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationData";
import Shelf from "../components/shop/Shelf";
import Floor from "../components/shop/Floor";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

function MapScreen(props: Props) {
  const {style, color} = useStyles();
  
  return (
    <ZoomableView
      minZoom={0.5}
      maxZoom={3}
      initialZoom={1}
    >
      <Floor width={420} height={420}>
        <Shelf width={5} height={30} top={0} left={0}/>
        <Shelf width={5} height={20} top={30} left={0}/>
        <Shelf width={5} height={50} top={50} left={0}/>
        <Shelf width={30} height={5} top={0} left={15}/>
        <Shelf width={25} height={5} top={0} left={45}/>
        <Shelf width={20} height={5} top={0} left={80}/>
        <Shelf width={5} height={30} top={10} left={95}/>
        <Shelf width={5} height={50} top={50} left={95}/>
        <Shelf width={5} height={20} top={80} left={85}/>
        <Shelf width={20} height={5} top={80} left={60}/>
      </Floor>
    </ZoomableView>
  );
}

export default MapScreen;