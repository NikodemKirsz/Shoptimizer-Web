import { useStyles } from "../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationData";
import Shop from "../components/shop/Shop";
import { useEffect, useState } from "react";
import { ShoppingShop } from "../models/ShopModels";
import { getShoppingShop } from "../models/FakeData";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

function MapScreen(props: Props) {
  const {style, color} = useStyles();

  const [shop, setShop] = useState<ShoppingShop>();

  useEffect(() => {
    const abortController = new AbortController();
    
    (async () => {
      const shoppingShop = getShoppingShop();
      setShop(shoppingShop);
    })()
      .catch(console.warn);
  }, []);

  return (
    <>
      {shop && (
        <Shop
          shop={shop}
        />
      )}
    </>
  );
}

export default MapScreen;