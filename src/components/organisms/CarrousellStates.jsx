import React from "react";
import { useState, useEffect } from "react";
import { View,  Text, StyleSheet, ActivityIndicator, FlatList, Modal} from "react-native";
import Card from "./Card";
import axios from "axios";
import { eco_explore_api } from "../../utils/ApiUtils";
import LogbookView from "../../screens/LogbookView";

const getImageUri = (item) => {
	if(item !== undefined && item.PuntosInteres.length){
		return {uri:item.PuntosInteres[0].UrlMedia};
	}
	else return require("../../../assets/image-load-failed.jpg");
};

const Carrousel = ({data}) => {
	const [visible,setVisible] = useState(false);
	const [ruta, setRuta] = useState({});
	return (
		<>
			{
				data.length? 
					<>
						<FlatList
							contentContainerStyle={styles.carrouselList}
							horizontal
							data={data}
							renderItem={({item}) => <Card 
								title={item.Nombre}
								dificulty={item.Dificultad}
								description={item.Descripcion}
								raiting={item.Puntuacion}
								imageUri={getImageUri(item)}
								onPress={() => {
									console.log(`Trajeta ${item.id} precionada `);
									setRuta(item);
									setVisible(!visible);
								}}
							/>}
							keyExtractor={item => item.id}
						/>
						<Modal animationType="slide"
							transparent={false} visible={visible}
							presentationStyle="pageSheet"
							onRequestClose={() => {
								setVisible(!visible);
							}}
							// presentationStyle="fullScreen"
						>
								
							<LogbookView ruta={ruta} setVisible={setVisible}/>
						</Modal>
					</>
					:
					<></>
			}
		</>
	);
};


const EmptyCarrousell = ({
	title = "No hay Tarjetas para mostrar 😔"
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const Loading = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator style={styles.activity} size="large" color="#68A044"/>
		</View>
	);
};

const CarrouselState = ({activity=""}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		const url = eco_explore_api + "/bitacoras/mejores/rutas/" + activity;
		console.log(url);
		axios.get(url).then((res) => {
			setIsLoading(false);
			if(!res.data.Rutas.length)
				setError(true);
			setData(res.data.Rutas);	
		}).catch(() => {
			setIsLoading(false);
			setError(true);
		});
	},[]);


	return (
		<>
			{isLoading? 
				<Loading/> : 
				<>{error? <EmptyCarrousell/> : <Carrousel data={data}/>}</>
			
			}
		</>
	);	
};

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor:"#FBFCFD",
		// marginHorizontal:5,
		marginVertical:5,

		// opacity:0.5,
		// borderWidth:0.8,
		borderRadius:20,
		flexDirection: "column",
		flexWrap:"wrap",
		height: 340,
		width: "100%",
		justifyContent:"center",
		alignContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 6,

	},
	activity:{
		flexDirection:"row",
		justifyContent:"center"
	},
	title: {
		width:300,
		opacity:2,
		flexWrap:"wrap",
		fontSize: 25,
		fontWeight: "600",
		textAlign:"center",
		// textAlignVertical:"center",
		textTransform: "capitalize",
        
	},
	carrouselList:{
		gap:10
	}
	
});

export default CarrouselState;
