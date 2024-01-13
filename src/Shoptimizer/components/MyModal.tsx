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
  dim?: boolean;
}

function MyModal(props: MyModalProps) {
  let {center, children, visible, close, mainContainerStyle, dim} = props;
  const {style, color} = useStyles();

  dim ??= true;
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={close}
      onDismiss={close}
    >
      <Pressable
        style={combine(style.modalBackground,
          dim && { backgroundColor: '#141a1fA0' },
          center && { justifyContent: 'center', alignItems: 'center' }
        )}
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