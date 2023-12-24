import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/molecules/SearchBar/SearchBar";
import SelectInputNative from "../components/atoms/Inputs/SelectInputNative";
import Card from "../components/organisms/Card";
import FilterBar from "../components/molecules/FilterBar/FilterBar";
const image = require("../../assets/default.jpg");

const LandingPage = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<SearchBar placeholder={"Busca"} />
				<FilterBar/>
			</View>
			<View style={styles.carrousel}>
				<Text style={styles.title}>las mejores rutas</Text>
				<Card
					imageUri={image}
					dificulty={"moderado"}
					raiting={"4.7"}
					totalVotes={407}
					title={"Example"}
					description={
						"este es un ejemplo de las cosas que se deben hacer y asi para no acabar desbordando las cosas, digo, una cosa lleva a la otra y asi, no se que onda"
					}
					onPress={() => {
						console.log("Carta Precionada");
					}}
				/>
			</View>
			<View style={styles.carrousel}>
				<Text style={styles.title}>las mejores vistas</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 10,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		gap: 10,
	},
	header: {
		flexDirection: "column",
		gap: 10,
	},
	linerFilter: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 5,
	},
	title: {
		fontSize: 50,
		fontWeight: "600",
		textTransform: "capitalize",
	},
	carrousel: {
		flexDirection: "column",
		gap: 5,
		padding: 5,
	},
});

export default LandingPage;
