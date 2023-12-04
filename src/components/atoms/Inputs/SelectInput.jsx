import SelectBox from "react-native-multi-selectbox";
import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const SelectInput = ({
  label = "select",
  options = [],
  value = {},
  onChange,
  filter,
}) => {
  return (
    <View>
      <SelectBox
        optionsLabelStyle={SelectStyle.config}
        containerStyle={SelectStyle.containerStyle}
        optionContainerStyle={SelectStyle.containerStyle}
        selectIcon={<Ionicons name="chevron-down" size={20} color="black" />}
        label=""
        inputPlaceholder={label}
        options={options}
        value={value}
        onChange={(coso) => onChange(coso)}
        hideInputFilter={!filter}
      />
    </View>
  );
};

const SelectStyle = StyleSheet.create({
  labelStyle: {},
  containerStyle: {
    backgroundColor: "#DFE4D9",
    color: "black",
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
  },
});
export default SelectInput;
