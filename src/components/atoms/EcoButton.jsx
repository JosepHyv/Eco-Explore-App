import { Pressable, Text } from "react-native";
import { EcoButtonStyle } from "./Styles";
const EcoButton = ({ title, onPress, onLongPress = {} }) => {
  return (
    <Pressable
      style={EcoButtonStyle.container}
      onPress={() => onPress()}
      onLongPress={() => {
        if (onLongPress) onLongPress();
      }}
    >
      <Text style={EcoButtonStyle.title}>{title}</Text>
    </Pressable>
  );
};

export default EcoButton;
