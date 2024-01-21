import React from "react";
import { View, Modal, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const SelectInputNative = ({
  placeholder = "selecciona",
  renderModal: RenderModal,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={style.container}>
      <Pressable
        style={style.pressableContainer}
        onPress={() => {
          setVisible(!visible);
        }}
      >
        <Text style={style.label}>{placeholder}</Text>
        <Ionicons name="chevron-down" size={24} />
      </Pressable>
      <Modal animationType="slide" visible={visible}>
        <RenderModal setVisible={setVisible} />
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 1,
    borderRadius: 100,
    borderWidth: 1,
    opacity: 0.7,
    backgroundColor: "#DFE4D9",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  pressableContainer: {
    flexDirection: "row",
  },
  label: {
    paddingHorizontal: 5,
    alignSelf: "center",
    justifyContent: "center",
    color: "black",
    fontWeight: "500",
    fontSize: 15,
    textAlign: "left",
  },
});

export default SelectInputNative;
