import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import InputLabel from "../components/atoms/Inputs/InputLabel";
import EcoButton from "../components/atoms/Buttons/EcoButton";
import SearchBar from "../components/molecules/SearchBar/SearchBar";

const EditProfile = ({ route }) => {
  const {
    explorers = [
      {
        id: 1,
        nameExplorer: "Obet Jair Hernandez Gonzalez",
        location: "Martinez de la torre, Veracruz",
        profileImageUri:
          "https://yt3.ggpht.com/yti/AGOGRCrF5eeibUitEoHaE6WPWO1jV8yMh5hQeBN4YKessLk=s108-c-k-c0x00ffffff-no-rj",
      },
    ],
  } = route.params || {};
  const renderExplorerItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.guideContainer}>
        <Text style={styles.itemName}>{item.nameExplorer}</Text>
        <Text style={styles.itemLocation}>{item.location}</Text>
        <Image
          source={{ uri: item.profileImageUri }}
          style={styles.itemImage}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Información personal</Text>
      <View style={styles.columnContainer}>
        <InputLabel placeholder={"Lugar"} />
      </View>
      <View style={styles.columnContainer}>
        <InputLabel placeholder={"Número de telefono"} />
      </View>

      <View style={styles.inputLabel}>
        <InputLabel placeholder={"Limite de personas"} />
      </View>
      <View style={styles.inputLabel}>
        <InputLabel placeholder={"Precio"} style={styles.inputLabel} />
      </View>

      <View style={styles.inputLabel}>
        <InputLabel placeholder={"Fecha"} style={styles.inputLabel} />
      </View>
      <View style={styles.inputLabel}>
        <InputLabel placeholder={"Hora"} style={styles.inputLabel} />
      </View>
      <View style={styles.inputLabel}>
        <SearchBar
          placeholder="Buscar exploradores"
          onTextChange={(content) => console.log("Filtrando", content)}
        />
      </View>
      <FlatList
        data={explorers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderExplorerItem}
      />
      <View>
        <EcoButton
          title={"Guardar"}
          onPress={() => console.log("¡ Saved !")}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  columnContainer: {
    flex: 2,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    marginBottom: 8,
  },
  button: {
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
  },
  guideContainer: {
    marginBottom: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemLocation: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
});

export default EditProfile;
