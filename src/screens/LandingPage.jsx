import React from "react";
import { useEffect, useState} from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import SearchBar from "../components/molecules/SearchBar/SearchBar";
import * as LocalStorage from "../hooks/LocalStorage";
import { eco_explore_api } from "../utils/ApiUtils";
import axios from "axios";
import useTokenStore from "../hooks/TockenStore";
import useUserStore from "../hooks/UserStore";
import RouteShowcase from "../components/organisms/RouteShowcase";
import SearchResult from "../components/molecules/SearchBar/SearchResults";

// Caminata,Ciclismo,Montañismo,Escalada,Rapel,Cañonismo
  
const LandingPage = ({navigation}) => {
	const {token, setToken} = useTokenStore();
	const {setUsuario} = useUserStore();
	const [searchRoute, setSearch] = useState("");
	useEffect(() => {
		const actividades = ["Caminata","Ciclismo","Montañismo","Escalada","Rapel","Cañonismo"];
		const urls = [];
		actividades.forEach(element => {urls.push(eco_explore_api + "/" + `bitacoras/mejores/rutas/${element}`);});
		if(token.access_token !== undefined){
			const config = {"headers": {"Authorization":"Bearer " + token.access_token}};
			console.log(config);
			axios.get(eco_explore_api + "/usuarios", config).then(ans => {
				setUsuario(ans.data);
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
			<SearchBar placeholder={"Busca Tus Rutas Favoritas!!"} value={searchRoute} onTextChange={(value) => setSearch(value)}/>
			<>{searchRoute.length? <SearchResult navigation={navigation} search={searchRoute}/>: <RouteShowcase/> }</>
			
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
