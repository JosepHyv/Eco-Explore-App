import { StyleSheet } from "react-native";

const EcoButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: "#68A044",
    padding: 10,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    textAlign: "center",
    alignContent: "center",
  },
  title: {
    fontWeight: "500",
    color: "#fff",
  },
});

export { EcoButtonStyle };
