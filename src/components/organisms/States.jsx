import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const EmptyCarrousell = ({ title = "No hay Tarjetas para mostrar 😔" }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="sad-outline" size={80} color="#68A044" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.activity} size="large" color="#68A044" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activity: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    opacity: 2,
    flexWrap: "wrap",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "600",
    color: "#68A044",
    textTransform: "capitalize",
  },
});

export { Loading, EmptyCarrousell };
