import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CarrouselState from "./CarrousellStates";

const RouteShowcase = ({ navigation }) => {
  return (
    <ScrollView style={{ height: "100%" }}>
      <View style={styles.carrousel}>
        <Text style={styles.title}>las mejores rutas de Caminata</Text>
        <CarrouselState activity="Caminata" />
      </View>
      <View style={styles.carrousel}>
        <Text style={styles.title}>las mejores rutas de Ciclismo</Text>
        <CarrouselState activity="Ciclismo" />
      </View>
      <View style={styles.carrousel}>
        <Text style={styles.title}>las mejores rutas de Montañismo</Text>
        <CarrouselState activity="Montañismo" />
      </View>
      <View style={styles.carrousel}>
        <Text style={styles.title}>las mejores rutas de Esacalada</Text>
        <CarrouselState activity="Escalada" />
      </View>
      <View style={styles.carrousel}>
        <Text style={styles.title}>las mejores rutas de Rapel</Text>
        <CarrouselState activity="Rapel" />
      </View>
      <View style={styles.carrousel}>
        <Text style={styles.title}>las mejores rutas de Cañonismo</Text>
        <CarrouselState activity="Cañonismo" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 10,
    paddingHorizontal: 7,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    gap: 10,
  },
  header: {
    flexDirection: "column",
    gap: 10,
  },
  linerFilter: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  carrousel: {
    flexDirection: "column",
    gap: 5,
    padding: 5,
  },

  carrouselList: {
    gap: 10,
  },
});

export default RouteShowcase;
