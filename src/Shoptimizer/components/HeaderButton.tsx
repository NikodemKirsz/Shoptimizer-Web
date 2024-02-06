import { GestureResponderEvent } from "react-native";
import { KnownIcons } from "./Icon";
import MyButton from "./MyButton";
import { useStyles } from "../hooks";

type Props = {
  iconType: KnownIcons;
  onPress?: ((event: GestureResponderEvent) => void);
  disabled?: boolean;
}

function HeaderButton(props: Props) {
  const {iconType, onPress, disabled} = props;
  const {color, style} = useStyles();
  
  return (
    <MyButton
      containerStyle={style.headerButton}
      size={36}
      backgroundColor={color.transparent}
      onPress={onPress}
      iconType={iconType}
      disabled={disabled}
    />
  );
}

export default HeaderButton;