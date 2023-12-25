import React from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import SearchBar from "../components/molecules/SearchBar/SearchBar";
import SelectInputNative from "../components/atoms/Inputs/SelectInputNative";
import Card from "../components/organisms/Card";
import FilterBar from "../components/molecules/FilterBar/FilterBar";
const image = require("../../assets/default.jpg");


const data = [
	{
		id:1,
		dificulty:"moderado",
		description:"lagunas",
		raiting:4.7,
		title: "ejemplo de un titulo",
		image,
		totalVotes:407
		
	},
	{
		id:2,
		dificulty:"facil",
		description:"lagunas",
		raiting:4.7,
		title: "ejemplo de un titulo",
		image,
		totalVotes:407
		
	},	
	{
		id:3,
		description:"lagunas",
		dificulty:"dificil",
		raiting:3.0,
		title: "ejemplo de un titulo",
		image,
		totalVotes:300
		
	},
];


const Item = ({title}) => (
	<View style={styles.item}>
	  <Text style={styles.title}>{title}</Text>
	</View>
);
  
const LandingPage = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<SearchBar placeholder={"Busca"} />
				<FilterBar/>
			</View>
			<ScrollView style={{height:"100%"}}>

				<View style={styles.carrousel}>
					<Text style={styles.title}>las mejores rutas</Text>
					<FlatList
						contentContainerStyle={styles.carrouselList}
						horizontal
						data={data}
						renderItem={({item}) => <Card 
							title={item.title}
							dificulty={item.dificulty}
							description={item.description}
							raiting={item.raiting}
							totalVotes={item.totalVotes}
							imageUri={item.image}
							onPress={() => console.log(`Trajeta ${item.id} precionada`)}
						/>}
						keyExtractor={item => item.id}
					/>
					{/* <Card
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
				/> */}
				</View>
				<View style={styles.carrousel}>
					<Text style={styles.title}>las mejores vistas</Text>
					<FlatList
						contentContainerStyle={styles.carrouselList}
						horizontal
						data={data}
						renderItem={({item}) => <Card 
							title={item.title}
							dificulty={item.dificulty}
							description={item.description}
							raiting={item.raiting}
							totalVotes={item.totalVotes}
							imageUri={item.image}
							onPress={() => console.log(`Trajeta ${item.id} precionada`)}
						/>}
						keyExtractor={item => item.id}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		marginVertical: 10,
		paddingHorizontal:7,
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

	carrouselList:{
		gap:10
	}
});

export default LandingPage;
