import { TextInput, View, StyleSheet, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const SearchBar = ({ placeholder, value, onTextChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => console.log("searching..")}>
          <Ionicons
            name="search"
            size={20}
            color="
          #68A044"
          />
        </Pressable>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(content) => onTextChange(content)}
      />
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: "#F2F2F2",
            opacity: 0.9,
            borderRadius: 100,
            padding: 2,
          },
        ]}
      >
        <Pressable onPress={() => console.log("filtering...")}>
          <Ionicons
            name="filter-outline"
            size={20}
            color="
          #68A044"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 3,
    padding: 3,
    gap: 5,
    borderColor: "#68A044",
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  iconContainer: {
    marginHorizontal: 5,
    justifyContent: "flex-start",
    alignSelf: "center",
    // borderWidth: 1,
  },
  textInput: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 5,
    // borderWidth: 1,
    // gap: 5,
  },
});

export default SearchBar;
