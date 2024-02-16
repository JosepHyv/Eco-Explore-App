import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Alert,
  Pressable,
} from "react-native";
import EcoButton from "../components/atoms/Buttons/EcoButton";
import EcoExplore from "../../assets/logos/EcoExplore.svg";
import InputLabelNative from "../components/atoms/Inputs/InpuLabelNative";
import { eco_explore_api } from "../utils/ApiUtils";
import axios from "axios";
import * as LocalStorage from "../hooks/LocalStorage";
import useTokenStore from "../hooks/TockenStore";
import InputLabel from "../components/atoms/Inputs/InputLabel";

const CrearCuenta = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  const [repContra, setRepContra] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");

  const [telefono, setTelefono] = useState("");

  // const {setToken} = useTokenStore();

  const VerificateCreate = () => {
    const data = {
      Nombre: nombre,
      ApellidoPaterno: apellidoP,
      ApellidoMaterno: apellidoM,
      Email: email,
      UrlImagen: "",
      PerfilPublico: true,
      Guia: false,
      Telefono: telefono,
      Bitacoras: [],
      Clave: contra,
    };

    if (
      !nombre.length ||
      !apellidoM.length ||
      !apellidoP.length ||
      !telefono.length ||
      !email.length
    ) {
      Alert.alert("Debes Llenar todos los campos");
      return;
    }

    if (!contra.length) {
      Alert.alert("Debes Ingresar una contraseña");
      return;
    }
    if (contra.length < 8) {
      Alert.alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (contra !== repContra) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }

    const url = eco_explore_api + "/usuarios/crear";
    axios
      .post(url, data)
      .then(() => {
        navigation.navigate("IniciarSesion");
      })
      .catch((ans) => {
        console.log(ans);
        Alert.alert("Los datos son invalidos");
      });
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.presentationContainer}>
        <View style={style.logo}>
          <EcoExplore width={160} height={160} style={{ margin: 5 }} />
        </View>
        <Text style={style.title}>eco explore</Text>
      </View>
      <InputLabel
        placeholder="Nombre"
        value={nombre}
        onChangeText={(value) => setNombre(value)}
      />
      <View style={style.rowContainer}>
        <InputLabel
          placeholder="Apellido Paterno"
          value={apellidoP}
          onChangeText={(value) => setApellidoP(value)}
        />
        <InputLabel
          placeholder="Apellido Materno"
          value={apellidoM}
          onChangeText={(value) => setApellidoM(value)}
        />
      </View>
      <View>
        <InputLabel
          placeholder="Correo"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <InputLabel
          placeholder="Telefono"
          value={telefono}
          onChangeText={(value) => setTelefono(value)}
        />
      </View>
      <InputLabelNative
        placeholder="Contraseña"
        value={contra}
        password
        onChangeText={(value) => setContra(value)}
      />
      <InputLabelNative
        placeholder="Repetir Contraseña"
        value={repContra}
        password
        onChangeText={(value) => setRepContra(value)}
      />

      <EcoButton title={"Registrarse"} onPress={() => VerificateCreate()} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingHorizontal: 7,
    gap: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  logo: {
    width: "100%",
    // borderWidth:1,
    alignItems: "center",
  },
  presentationContainer: {
    marginVertical: 20,
    width: "100%",
    height: 225,
    gap: 10,
    // borderWidth:1,
    flexDirection: "column",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 0.5,
    backgroundColor: "green",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    // borderWidth:1,
    color: "#68A044",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 15,
    paddingHorizontal: 10,
    fontWeight: "400",
    borderBottomWidth: 1,
    textAlign: "center",
    alignSelf: "center",
    // textTransform:"capitalize"
  },
  button: {
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
  },
  subContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    // gap:10,
    borderWidth: 1,
    // paddingHorizontal: 10
  },
  rowContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    // marginBottom: 16,
  },
});

export default CrearCuenta;
