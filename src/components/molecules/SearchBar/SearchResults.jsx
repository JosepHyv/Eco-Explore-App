import React from "react";
import {useState, useEffect} from "react";
import { Text, View, Pressable, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FilterBar from "../FilterBar/FilterBar";
import axios from "axios";
import { eco_explore_api, getImageUri } from "../../../utils/ApiUtils";
// import Card from "../../organisms/Card";
import SearchCard from "../../organisms/SearchCard";


const SearchCards = ({rutas}) => { 
	return ( 
		<>
			{rutas.length? 
				<FlatList
					contentContainerStyle={{ marginVertical:5, gap:15}}
					data={rutas}
					renderItem={({item}) => <SearchCard 
						title={item.Nombre}
						dificulty={item.Dificultad}
						raiting={item.Puntuacion}
						imageUri={getImageUri(item)}
						onPress={() => {
							console.log(`Trajeta ${item.id} precionada `);
						}}
						search
					/>}
					keyExtractor={item => item.id}
					style={{flex:1}}
				/> 
				: <></> 
			}
			
		</>
	);
};


const SearchResult = ({navigation, search}) => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [rutas, setRutas] = useState([]);
	useEffect(() => {
		console.log(search);
		setLoading(true);
		setError(false);
		const url = eco_explore_api + "/rutas/obtener";
		const config = {
			params:{search}
		};

		axios.get(url, config).then((res) => {
			// setError(false), 
			setLoading(false);
			if(!res.data.Rutas.length) setError(true);
			setRutas(res.data.Rutas);
			console.log(res.data.Rutas);
		}).catch(() => {
			setError(true);
			setLoading(false);
			setRutas([]);
		});

	}, [search]);

	return (
		<View style={style.container}>
			<FilterBar/>
			<View style={style.resultsArea}>
				<>
					{
						loading? 
							<ActivityIndicator style={style.activity} size="large" color="#68A044"/> :
							<>
								{
									error? 
										<View style={[style.activity, {flex:1,justifyContent:"center", alignItems:"center"}]}>
											<Ionicons name="sad-outline" size={80} color="#68A044" />
											<Text style={style.title}> No existen resultados</Text>	
										</View> 
										: 
										<SearchCards rutas={rutas}/>
								}
							</> 
					}
					
				</>
			</View>
		</View>

	);
};

const style = StyleSheet.create({
	container:{
		flex:1, 
		flexDirection:"column",
		gap:10,
		// borderWidth:1,
	},
	errorArea:{},
	resultsArea:{
		flex:1,
		justifyContent:"flex-start",
		alignContent:"center"
		// borderWidth:1,
	},
	activity:{
		flexDirection:"column",
		marginVertical:100,
		alignContent:"center",
		justifyContent:"flex-start"
	},
	title:{
		fontSize:35,
		fontWeight:"600", 
		color:"#68A044",
		textTransform:"capitalize",
	}
});

export default SearchResult;