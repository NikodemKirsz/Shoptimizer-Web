import {
  Modal,
  Pressable,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { useStyles } from "../hooks";
import { ReactNode } from "react";
import { combine } from "../logic/viewHelpers";

interface MyModalProps {
  children?: ReactNode | undefined;
  center?: boolean;
  visible: boolean;
  close: () => void;
  mainContainerStyle?: StyleProp<ViewStyle>;
}

function MyModal(props: MyModalProps) {
  const {center, children, visible, close, mainContainerStyle} = props;
  const {style, color} = useStyles();
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={close}
      onDismiss={close}
    >
      <Pressable
        style={combine(style.modalBackground, !!center && { justifyContent: 'center' })}
        onPressOut={close}
      >
        <TouchableWithoutFeedback>
          <View style={combine(style.modalView, mainContainerStyle )}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}

export default MyModal;