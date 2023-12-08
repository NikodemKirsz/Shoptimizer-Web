import {
  Modal,
  Pressable,
  StyleProp,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from "react-native";
import { useStyles } from "../hooks";
import React, { ReactNode } from "react";
import { combine } from "../logic/helpers";
import MyPressable from "./MyPressable";

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
  
  const modalViewContainerStyle = combine(style.modalBackground, !!center && { justifyContent: 'center' });
  const computedMainContainerStyle = combine(style.modalView, mainContainerStyle);
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={close}
      onDismiss={close}
    >
      <Pressable
        style={modalViewContainerStyle}
        onPressOut={close}
      >
        <TouchableWithoutFeedback>
          <View style={computedMainContainerStyle}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}

export default MyModal;