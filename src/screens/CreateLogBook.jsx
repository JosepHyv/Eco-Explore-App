import React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Text, StyleSheet, Alert, Modal } from "react-native";
import AmountCard from "../components/atoms/Cards/AmountCard";
import useUserStore from "../hooks/UserStore";
import useTokenStore from "../hooks/TockenStore";
import { eco_explore_api } from "../utils/ApiUtils";
import * as localStorage from "../hooks/LocalStorage";
import axios from "axios";
import { Loading, EmptyCarrousell } from "../components/organisms/States";
import EcoButton from "../components/atoms/Buttons/EcoButton";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import InputLabel from "../components/atoms/Inputs/InputLabel";
// import { eco_explore_api } from "../utils/ApiUtils";
const Maps = ({ point }) => {
  let Lon = 0;
  let Lat = 0;
  if (point && point.Lon !== undefined) {
    Lon = point.Lat;
    Lat = point.Lon;
  }
  const first = {
    longitude: Lon,
    latitude: Lat,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };
  return (
    <MapView style={styles.map} initialRegion={first}>
      <Marker coordinate={first} />
    </MapView>
  );
};

const Formulario = ({ setId, setError }) => {
  const { token, setToken } = useTokenStore();
  const [nombre, setN] = useState("");
  const [descripcion, setDes] = useState("");
  const [actividad, setAct] = useState("");
  const [dificultad, setDif] = useState("");

  const validas = [
    "caminata",
    "montañismo",
    "ciclismo",
    "escalada",
    "rapel",
    "cañonismo",
  ];
  const difVa = ["fácil", "moderado", "difícil"];
  const validar = () => {
    if (!nombre || !descripcion || !actividad || !dificultad) {
      Alert.alert("Todos los campos son requeridos");
      return;
    }

    if (!validas.includes(actividad.toLocaleLowerCase())) {
      Alert.alert(
        "Las unicas actividades permitidas son Caminata,Ciclismo,Montañismo,Escalada,Rapel,Cañonismo "
      );
      return;
    }
    if (!difVa.includes(dificultad.toLocaleLowerCase())) {
      Alert.alert(
        "Las unicas dificultades permitidas son Facíl, Moderado y Difícil"
      );
      return;
    }
    const url = eco_explore_api + `/bitacoras/crear/${usuario.id}`;

    const body = {
      Nombre: nombre,
      Publica: true,
      Descripcion: descripcion,
      Actividad: actividad,
      Dificultad: dificultad,
      EquipoNecesario: [],
      PuntosInteres: [],
      Comentarios: [],
      Puntuacion: 0,
    };
    const headers = {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
        accept: "application/json",
      },
    };

    axios
      .post(url, body, headers)
      .then((response) => {
        console.log(response.data);
        setId(response.data.id);
      })
      .catch(() => {
        setId("");
      });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Nombre</Text>
      <InputLabel
        placeholder="Nombre"
        value={nombre}
        onChangeText={(value) => setN(value)}
      />
      <Text>Descripcion</Text>
      <InputLabel
        placeholder="Descripcion"
        value={descripcion}
        onChangeText={(value) => setDes(value)}
      />
      <Text>Actividad</Text>
      <InputLabel
        placeholder="Actividad"
        value={actividad}
        onChangeText={(value) => setAct(value)}
      />
      <Text>Actividad</Text>
      <InputLabel
        placeholder="Dificultad"
        value={dificultad}
        onChangeText={(value) => setDif(value)}
      />

      <EcoButton title={"Crear"} onPress={() => validar()} />
    </View>
  );
};

const Bitacora = ({ setVisible, visible }) => {
  const [location, setLocation] = useState(null);
  const [id, setId] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(JSON.stringify(location));
      setLocation({
        Lon: location.coords.latitude,
        Lat: location.coords.longitude,
      });
    })();
  });
  return (
    <>
      {location ? (
        <>
          <View style={{ flex: 1, marginTop: 10 }}>
            <View style={styles.mapContainer}>
              <Maps point={location} />
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EcoButton title={"Agregar Punto"} onPress={() => {}} />
            </View>
          </View>
          {/* {id.length?
                            : 
                        <>{error?<EmptyCarrousell title={"ocurrio un error inesperado"}/>:
                        }</> : 
                    
                } */}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

const ImageUri = (element) => {
  if (!element || !element.length) {
    return require("../../assets/perfil-no-encontrado.png");
  } else return { uri: element };
};

const CreateLogBook = ({ navigation }) => {
  const { usuario, setUsuario } = useUserStore();
  const { token, setToken } = useTokenStore();
  const [rutas, setRutas] = useState({});
  const [agenda, setAgendada] = useState([]);
  const [publicas, setPublicas] = useState(0);
  const [guardadas, setGuardadas] = useState(0);
  const [agendadas, setAgendadas] = useState(0);
  const [loadRuta, setLoadRuta] = useState(true);
  const [loasAgenda, setLoadAgenda] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (token !== undefined && token.access_token) {
      const url = eco_explore_api + "/usuarios";
      const headers = {
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
          accept: "application/json",
        },
      };
      const urlRutas = `${eco_explore_api}/bitacora/detalles/${usuario.id}`;
      console.log(urlRutas);
      axios
        .get(urlRutas, headers)
        .then((response) => {
          // console.log(JSON.stringify(response.data, null, 4));
          setLoadRuta(false);
          setRutas(response.data);
          setPublicas(response.data.Publicas.Rutas.length);
          setGuardadas(response.data.Guadadas.Rutas.length);
        })
        .catch((error) => {
          setError(true);
          setLoadRuta(false);
          console.log("Error en rutas", error);
          // Alert.alert("Lo sentimos. tenemos problemas para cargar el contenido",
          // 	[{text: "OK", onPress: () => navigation.navigate("IniciarSesion")}]);
        });
      const urlExplo = `${eco_explore_api}/exploraciones/${usuario.id}`;
      console.log(urlExplo);
      axios
        .get(urlExplo, headers)
        .then((response) => {
          setLoadAgenda(false);
          setAgendada(response.data.Agenda);
          setAgendadas(response.data.Agenda.length);
        })
        .catch((error) => {
          setError(true);
          setLoadAgenda(false);
          console.log("Error en agendas", JSON.stringify(error, null, 4));
          // Alert.alert("Lo sentimos. tenemos problemas para cargar el contenido",
          // [{text: "OK", onPress: () => navigation.navigate("IniciarSesion")}]);
        });
      // axios.get(url, headers).then((res) => {
      // 	console.log(JSON.stringify(res.data));
      // 	setUsuario(res.data);
      // }).catch((error) => {
      // 	console.log("error recuperando usuario",JSON.stringify(error));
      // });
    } else {
      localStorage.removeValue("token").then(() => {
        setToken({});
        navigation.navigate("IniciarSesion");
      });
    }
  }, [usuario]);
  return (
    <SafeAreaView style={styles.container}>
      <>
        {loasAgenda || loadRuta ? (
          <Loading />
        ) : (
          <>
            {error ? (
              <EmptyCarrousell title="Ocurrio un error cargando los datos" />
            ) : (
              <>
                <View style={{ flex: 1, gap: 10 }}>
                  <View style={{ alignItems: "center" }}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        source={ImageUri(usuario.UrlImagen)}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "500",
                        marginVertical: 15,
                      }}
                    >
                      {usuario.Nombre + " " + usuario.ApellidoPaterno}
                    </Text>
                    <View style={styles.horizontalContainer}>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                          {publicas}
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                          Bitacoras
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                          {guardadas}
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                          Guardadas
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                          {agendadas}
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                          Agendadas
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      gap: 10,
                      marginHorizontal: 20,
                    }}
                  >
                    <View
                      style={{
                        height: 200,
                        width: "100%",
                        borderRadius: 18,
                        backgroundColor: "#68A044",
                        alignItems: "center",
                      }}
                    >
                      {/* <Text></Text> */}
                      <Image
                        source={require("../../assets/mapas.png")}
                        style={{ height: 120, width: 120 }}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        {" "}
                        Creatu Bitacora
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "600",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Utiliza el mapa, traza tus rutas y cuenta tus historias
                      </Text>
                    </View>
                    <EcoButton
                      title="Crear Bitacora"
                      onPress={() => {
                        setVisible(!visible);
                      }}
                    />
                  </View>
                </View>
                <Modal
                  visible={visible}
                  onRequestClose={() => {
                    setVisible(!visible);
                  }}
                  presentationStyle="pageSheet"
                  animationType="slide"
                >
                  <Bitacora visible={visible} setVisible={setVisible} />
                </Modal>
              </>
            )}
          </>
        )}
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    // gap:10,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: 250,
    marginVertical: 10,
    width: 250,
    alignItems: "center",
    borderRadius: 300,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  image: {
    height: "100%",
    width: 250,
    resizeMode: "stretch",
    borderRadius: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    // marginBottom: 16,
  },
  columnContainer: {
    flex: 2,
  },
  horizontalContainer: {
    // flex:1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputLabel: {
    marginBottom: 8,
  },
  button: {
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
  },
  map: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  mapContainer: {
    flex: 0.4,
    borderWidth: 1,
    padding: 5,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: "white",
  },
});

export default CreateLogBook;
