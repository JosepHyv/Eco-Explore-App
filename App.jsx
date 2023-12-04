import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import SearchBar from "./src/components/molecules/SearchBar/SearchBar";
import SelectInput from "./src/components/atoms/Inputs/SelectInput";

export default function App() {
  const [valor, setValor] = useState("");
  const [selected, setSelected] = useState({});

  const koptions = [
    {
      item: "Jaltipan",
      id: "jl",
    },
    {
      item: "another",
      id: "an",
    },
    {
      item: "weyes",
      id: "wl",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{ fontWeight: "700", marginVertical: 10 }}>
        Prueba de Componente Atomo Boton
      </Text>
      <View style={{ flex: 1 }}>
        <InputLabel
          value={valor}
          placeholder={"Contraseña"}
          secureTextEntry={true}
          onChangeText={(entrada) => {
            setValor(entrada);
            console.log(entrada);
          }}
          mode="phone-pad"
        />
        <Text style={{ fontWeight: "700", marginVertical: 10 }}>
          Prueba de Componente amount card
        </Text>
        <AmountCard amount={10} descripion={"Exploraciones"} />
      </View> */}
      <SearchBar
        placeholder={"Buscar Rutas"}
        value={valor}
        onTextChange={(content) => {
          console.log(content);
          setValor(content);
        }}
      />
      <SelectInput
        label={"Puntuacion"}
        options={koptions}
        value={selected}
        onChange={(item) => {
          console.log(item);
          setSelected(item);
        }}
        filter={false}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    margin: 50,
    borderColor: "#000",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
