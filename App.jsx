import React from "react";
import { useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
} from "react-native";

import LogIn from "./src/screens/LogIn";
import { NavigationContainer } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingPage from "./src/screens/LandingPage";


const Tab = createBottomTabNavigator();




export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<NavigationContainer>
				<StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
				<Tab.Navigator
					// screenOptions={{

					// 	// tabBarStyle: { position: "absolute" },
					// 	tabBarBackground: () => (
					// 		<BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
					// 	),
					// }}
				>
					<Tab.Screen
						name="LogIn"
						component={LogIn}
						options={{tabBarShow: false,headerShown: false}}
					/>
					<Tab.Screen
						name='LandingPage'
						component={LandingPage}
						options={{headerShown: false}}
					/>
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
