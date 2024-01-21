import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import LogIn from "./src/screens/LogIn";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingPage from "./src/screens/LandingPage";
import Ionicons from "@expo/vector-icons/Ionicons";
import useTokenStore from "./src/hooks/TockenStore";
import CrearCuenta from "./src/screens/Crear";
import EditProfile from "./src/screens/EditProfile";
import * as LocalStorage from "./src/hooks/LocalStorage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CreateLogBook from "./src/screens/CreateLogBook";
import axios from "axios";
import { eco_explore_api } from "./src/utils/ApiUtils";
import useUserStore from "./src/hooks/UserStore";
const Tab = createBottomTabNavigator();
const Theme = {
  // ...DefaultTheme,
  dark: false,
  colors: {
    dark: "#fff",
    ...DefaultTheme.colors,
    primary: "#fff",
    background: "#fff",
  },
};

export default function App() {
  const { token, setToken } = useTokenStore();
  const { setUsuario } = useUserStore();

  useEffect(() => {
    // console.log(token);
    LocalStorage.getData("token")
      .then((ans) => {
        if (ans.access_token !== undefined) {
          console.log(ans);
          setToken(ans);
          const config = {
            headers: { Authorization: "Bearer " + ans.access_token },
          };

          axios
            .get(eco_explore_api + "/usuarios", config)
            .then((ans) => {
              setUsuario(ans.data);
            })
            .catch((error) => {
              LocalStorage.removeValue("token")
                .then(() => {
                  setToken({});
                })
                .catch(() => {});
              console.log(eco_explore_api + "/usuarios", error);
            });
        }
      })
      .catch(() => {
        setToken({});
      });
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
        <NavigationContainer theme={Theme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              gestureEnabled: true,
              tabBarLabelStyle: { fontSize: 13 },
              tabBarStyle: { position: "fixed" },
              tabBarIcon: ({ focused, color }) => {
                let iconName;

                if (route.name === "Explorar") {
                  // iconName = "search-circle";
                  iconName = focused
                    ? "search-circle-sharp"
                    : "search-circle-outline";
                } else if (route.name === "Agregar") {
                  iconName = focused ? "add-circle" : "add-circle-outline";
                } else if (route.name === "Perfil") {
                  iconName = focused ? "person-add" : "person-add-outline";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={30} color={color} />;
              },
              tabBarActiveTintColor: "green",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <>
              {token.access_token === undefined ? (
                <>
                  <Tab.Screen
                    name="IniciarSesion"
                    component={LogIn}
                    options={{
                      tabBarStyle: { display: "none" },
                      headerShown: false,
                    }}
                  />
                  <Tab.Screen
                    name="CrearCuenta"
                    component={CrearCuenta}
                    options={{
                      tabBarStyle: { display: "none" },
                      headerShown: false,
                    }}
                  />
                </>
              ) : (
                <>
                  <Tab.Screen
                    name="Explorar"
                    component={LandingPage}
                    options={{ headerShown: false }}
                  />
                  <Tab.Screen
                    name="Agregar"
                    component={CreateLogBook}
                    options={{ headerShown: false }}
                  />
                  <Tab.Screen
                    name="Perfil"
                    component={EditProfile}
                    options={{ headerShown: false }}
                  />
                </>
              )}
            </>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    // paddingHorizontal:10,
    // margin: 5,
    gap: 10,
    // borderWidth: 1,
  },
  title: {
    flexWrap: "wrap",
    textAlign: "left",
    textTransform: "capitalize",
    fontSize: 40,
    padding: 5,
    fontWeight: "500",
  },
});
