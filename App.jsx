import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import EcoButton from "./src/components/atoms/EcoButton";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: "700", marginVertical: 10 }}>
        Prueba de Componente Atomo Boton
      </Text>
      <EcoButton
        title="Presioname"
        onPress={() => {
          console.log("Boton Eco Explore presionado");
        }}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
