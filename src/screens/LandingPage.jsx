import React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import SearchBar from "../components/molecules/SearchBar/SearchBar";
import Card from "../components/organisms/Card";
import FilterBar from "../components/molecules/FilterBar/FilterBar";
import * as LocalStorage from "../hooks/LocalStorage";
import { eco_explore_api } from "../utils/constants";
import axios from "axios";
import EmptyCarrousell from "../components/organisms/EmptyCarrousell";
import useTokenStore from "../hooks/TockenStore";
import useUserStore from "../hooks/UserStore";


// Caminata,Ciclismo,Montañismo,Escalada,Rapel,Cañonismo
  
const LandingPage = ({navigation}) => {
	const [caminata, setCaminata] = useState([]);
	const [ciclismo, setCiclismo] = useState([]);
	const [montianismo, setMontianismo] = useState([]);
	const [escalada, setEscalada] = useState([]);
	const [rapel, setRapel] = useState([]);
	const [canonismo, setCanonismo] = useState([]);
	const {token, setToken} = useTokenStore();
	const {setUsuario} = useUserStore();

	const getImageUri = (item) => {
		if(item !== undefined && item.PuntosInteres.length){
			return {uri:item.PuntosInteres[0].UrlMedia};
		}
		else return require("../../assets/image-load-failed.jpg");
	};

	useEffect(() => {
		const actividades = ["Caminata","Ciclismo","Montañismo","Escalada","Rapel","Cañonismo"];
		const urls = [];
		actividades.forEach(element => {urls.push(eco_explore_api + "/" + `bitacoras/mejores/rutas/${element}`);});
		if(token.access_token !== undefined){
			const config = {"headers": {"Authorization":"Bearer " + token.access_token}};
			console.log(config);
			axios.get(eco_explore_api + "/usuarios", config).then(ans => {
				setUsuario(ans.data);
				axios.get(urls[0], config).then(ans => {
					setCaminata(ans.data.Rutas);
				}).catch(() => {setCaminata([]);});	
				axios.get(urls[1], config).then(ans => {
					setCiclismo(ans.data.Rutas);
				}).catch(() => {setCiclismo([]);});	
				axios.get(urls[2], config).then(ans => {
					setMontianismo(ans.data.Rutas);
				}).catch(() => {setMontianismo([]);});	
				axios.get(urls[3], config).then(ans => {
					setEscalada(ans.data.Rutas);
				}).catch(() => {setEscalada([]);});	
				axios.get(urls[4], config).then(ans => {
					setRapel(ans.data.Rutas);
				}).catch(() => {setRapel([]);});	
				axios.get(urls[5], config).then(ans => {
					setCanonismo(ans.data.Rutas);
				}).catch(() => {setCanonismo([]);});	
			}).catch((error) => {
				LocalStorage.removeValue("token").then(() => {
					setToken({});
					navigation.navigate("IniciarSesion");
				}).catch(() => {});
				console.log(eco_explore_api + "/usuarios",error);
			});
			
		}
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<SearchBar placeholder={"Busca"} />
				<FilterBar/>
			</View>
			<ScrollView style={{height:"100%"}}>

				<View style={styles.carrousel}>
					<Text style={styles.title}>las mejores rutas de Caminata</Text>
					<>
						{caminata.length? 
							<FlatList
								contentContainerStyle={styles.carrouselList}
								horizontal
								data={caminata}
								renderItem={({item}) => <Card 
									title={item.Nombre}
									dificulty={item.Dificultad}
									description={item.Descripcion}
									raiting={item.Puntuacion}
									imageUri={getImageUri(item)}
									onPress={() => {
										console.log(`Trajeta ${item.id} precionada `);
										LocalStorage.getData("token").then((result) => {
											console.log(result);
										});
									// console.log(element);
									}}
								/>}
								keyExtractor={item => item.id}
							/>
							: 
							<EmptyCarrousell/>
						}
					</>
					
				</View>
				<View style={styles.carrousel}>
					<Text style={styles.title}>las mejores rutas de Ciclismo</Text>
					<>
						{ciclismo.length? 
							<FlatList
								contentContainerStyle={styles.carrouselList}
								horizontal
								data={ciclismo}
								renderItem={({item}) => <Card 
									title={item.Nombre}
									dificulty={item.Dificultad}
									description={item.Descripcion}
									raiting={item.Puntuacion}
									imageUri={getImageUri(item)}
									onPress={() => {
										console.log(`Trajeta ${item.id} precionada `);
										LocalStorage.getData("token").then((result) => {
											console.log(result);
										});
									// console.log(element);
									}}
								/>}
								keyExtractor={item => item.id}
							/>
							: 
							<EmptyCarrousell/>
						}
					</>
				</View>
				<View style={styles.carrousel}>
					<Text style={styles.title}>las mejores rutas de Montañismo</Text>
					<>
						{montianismo.length? 
							<FlatList
								contentContainerStyle={styles.carrouselList}
								horizontal
								data={montianismo}
								renderItem={({item}) => <Card 
									title={item.Nombre}
									dificulty={item.Dificultad}
									description={item.Descripcion}
									raiting={item.Puntuacion}
									imageUri={getImageUri(item)}
									onPress={() => {
										console.log(`Trajeta ${item.id} precionada `);
										LocalStorage.getData("token").then((result) => {
											console.log(result);
										});
									// console.log(element);
									}}
								/>}
								keyExtractor={item => item.id}
							/>
							: 
							<EmptyCarrousell/>
						}
					</>
				</View>
				<View style={styles.carrousel}>
					<Text style={styles.title}>las mejores rutas de Esacalada</Text>
					<>
						{escalada.length? 
							<FlatList
								contentContainerStyle={styles.carrouselList}
								horizontal
								data={escalada}
								renderItem={({item}) => <Card 
									title={item.Nombre}
									dificulty={item.Dificultad}
									description={item.Descripcion}
									raiting={item.Puntuacion}
									imageUri={getImageUri(item)}
									onPress={() => {
										console.log(`Trajeta ${item.id} precionada `);
										LocalStorage.getData("token").then((result) => {
											console.log(result);
										});
									// console.log(element);
									}}
								/>}
								keyExtractor={item => item.id}
							/>
							: 
							<EmptyCarrousell/>
						}
					</>
				</View>
				<View style={styles.carrousel}>
					<Text style={styles.title}>las mejores rutas de Rapel</Text>
					<>
						{rapel.length? 
							<FlatList
								contentContainerStyle={styles.carrouselList}
								horizontal
								data={rapel}
								renderItem={({item}) => <Card 
									title={item.Nombre}
									dificulty={item.Dificultad}
									description={item.Descripcion}
									raiting={item.Puntuacion}
									imageUri={getImageUri(item)}
									onPress={() => {
										console.log(`Trajeta ${item.id} precionada `);
										LocalStorage.getData("token").then((result) => {
											console.log(result);
										});
									// console.log(element);
									}}
								/>}
								keyExtractor={item => item.id}
							/>
							: 
							<EmptyCarrousell/>
						}
					</>
				</View>
				<View style={styles.carrousel}>
					<Text style={styles.title}>las mejores rutas de Cañonismo</Text>
					<>
						{canonismo.length? 
							<FlatList
								contentContainerStyle={styles.carrouselList}
								horizontal
								data={canonismo}
								renderItem={({item}) => <Card 
									title={item.Nombre}
									dificulty={item.Dificultad}
									description={item.Descripcion}
									raiting={item.Puntuacion}
									imageUri={getImageUri(item)}
									onPress={() => {
										console.log(`Trajeta ${item.id} precionada `);
										LocalStorage.getData("token").then((result) => {
											console.log(result);
										});
									// console.log(element);
									}}
								/>}
								keyExtractor={item => item.id}
							/>
							: 
							<EmptyCarrousell/>
						}
					</>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginVertical: 10,
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
		fontSize: 35,
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
