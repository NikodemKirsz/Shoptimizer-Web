import { DimensionValue, Text, View } from "react-native";
import { useStyles } from "../hooks";
import { Icon } from "./Icon";
import MyPressable from "./MyPressable";
import { clamp } from "../logic/numberHelpers";

interface AmounterProps {
  value: number;
  setValue: (val: number) => void;
}

function Amounter(props: AmounterProps) {
  const { setValue, value } = props;
  const {style, color} = useStyles();

  const size: DimensionValue = 20;
  
  const clampAmount = (val: number) => clamp(val, 1, 99);
  const increase = (val: number = 1) => setValue(clampAmount(value + val));
  const decrease = (val: number = 1) => setValue(clampAmount(value - val));
  
  
  return (
    <View style={style.amounterContainer}>
      <MyPressable
        style={style.amounterButton}
        onPressIn={() => decrease()}
        onLongPress={() => decrease(5)}
      >
        <Icon name={"remove"} size={size} color={color.text}/>
      </MyPressable>
      <View style={style.amounterText}>
        <Text style={style.text}>{value}</Text>
      </View>
      <MyPressable
        style={style.amounterButton}
        onPressIn={() => increase()}
        onLongPress={() => increase(5)}
      >
        <Icon name={"add"} size={size} color={color.text}/>
      </MyPressable>
    </View>
  );
}

export default Amounter;