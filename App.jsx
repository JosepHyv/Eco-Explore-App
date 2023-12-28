import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import ScheduleExploration from "./src/screens/ScheduleExploration";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
	const guide1 = {
		id: 1,
		guideName: "Miguel Zinedinne",
		location: "Xalapa, Veracruz",
		rating: 4,
		phoneNumber: "123-456-7890",
		profileImageUri: "../../assets/Fotos/Foto_de_perfil.png",
	};

	const guide2 = {
		id: 2,
		guideName: "Ana Garcia",
		location: "Mexico",
		rating: 5,
		phoneNumber: "987-654-3210",
		profileImageUri: "../../assets/Fotos/Foto_de_perfil.png",
	};

	const guide3 = {
		id: 3,
		guideName: "Carlos Rodriguez",
		location: "Guadalajara, Jalisco",
		rating: 3,
		phoneNumber: "555-123-4567",
		profileImageUri: "../../assets/Fotos/Foto_de_perfil.png",
	};

	return (
		<SafeAreaView style={styles.container}>
			<NavigationContainer>
				<StatusBar barStyle="default" />
				<Stack.Navigator>
					<Stack.Screen
						name="ScheduleExploration"
						component={ScheduleExploration}
						options={{ headerShown: false }}
						//						initialParams={{ guides: [guide1, guide2, guide3] }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10,
		gap: 10,
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
