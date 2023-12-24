import React from "react";
import { useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
} from "react-native";

import LogIn from "./src/screens/LogIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import LandingPage from "./src/screens/LandingPage";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<NavigationContainer>
				<StatusBar barStyle={"default"} />
				<Stack.Navigator>
					<Stack.Screen
						name="LogIn"
						component={LogIn}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name='LandingPage'
						component={LandingPage}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
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
