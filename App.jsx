import React from "react";
import { useState, useEffect } from "react";
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
} from "react-native";

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

const Tab = createBottomTabNavigator();
const Theme = {
	// ...DefaultTheme,
	dark:true,
	colors:{
		dark:"#000",
		// ...DefaultTheme.colors,
		primary: "#fff",
		background:"#fff"
	}
};


export default function App() {
	const {token,setToken} = useTokenStore();

	useEffect(() => {
		// console.log(token);
		LocalStorage.getData("token").then((ans) => {
			if(ans.access_token !== undefined){
				console.log(ans);
				setToken(ans);
			}
		}).catch(() => {
			setToken({});
		});
	},[]);
	return (
		<SafeAreaView style={styles.container}>
			<NavigationContainer theme={Theme}>
				<StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarLabelStyle:{fontSize:13},
						tabBarStyle: { position: "fixed" },
						tabBarIcon: ({ focused, color }) => {
							let iconName;

							if (route.name === "Explorar") {
								// iconName = "search-circle";
								iconName = focused ? "search-circle-sharp" : "search-circle-outline";
							} else if (route.name === "Agregar") {
								iconName = focused ? "add-circle" : "add-circle-outline";
							}
							else if (route.name === "Perfil"){
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
						{ (token.access_token === undefined)? 
							<>
								<Tab.Screen
									name="IniciarSesion"
									component={LogIn}
									options={{tabBarStyle: {display:"none"},headerShown: false}}
								/>
								<Tab.Screen
									name="CrearCuenta"
									component={CrearCuenta}
									options={{tabBarStyle: {display:"none"},headerShown: false}}
								/>
							</> : 
							<>
								<Tab.Screen
									name='Explorar'
									component={LandingPage}
									options={{headerShown: false}}
								/>
								<Tab.Screen
									name='Agregar'
									component={LandingPage}
									options={{headerShown: false}}
								/>
								<Tab.Screen
									name='Perfil'
									component={EditProfile}
									options={{headerShown: false}}
								/>
							</>}
					</>
				</Tab.Navigator>
			</NavigationContainer>
		
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:"#fff",

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
