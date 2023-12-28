import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import InputLabel from "../components/atoms/Inputs/InputLabel";
import EcoButton from "../components/atoms/Buttons/EcoButton";

const EditProfile = ({ route }) => {
	const { name = "Jose", lastName = "Hernandez Gonzalez", email = "Jose@email.com", location = "Xalapa, Veracruz" } = route.params || {};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Información personal</Text>
			<View style={styles.rowContainer}>
				<View style={styles.columnContainer}>
					<InputLabel placeholder={name} />
				</View>
				<View style={styles.columnContainer}>
					<InputLabel placeholder={lastName} />
				</View>
			</View>
			<View style={styles.inputLabel}>
				<InputLabel  placeholder={email} />
			</View>
			<View style={styles.inputLabel}>
				<InputLabel placeholder={location} style={styles.inputLabel}  />
			</View>
			<EcoButton title={"Guardar"} onPress={() => console.log("¡ Saved !")} style={styles.button}/>
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
	},button:{
		fontSize:20, 
		textTransform:"uppercase",
		textAlign:"center"
	},
});

export default EditProfile;
