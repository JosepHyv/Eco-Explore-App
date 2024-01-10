import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text, Image, FlatList, Pressable, SafeAreaView, Modal} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome6 } from "@expo/vector-icons";
import { eco_explore_api, getImageUri } from "../utils/ApiUtils";
import ComentaryView from "./ComentaryView";
import useCurrentRouteStore from "../hooks/currentRouteStore";

const delimiteDescription = (desc) => {
	if(desc && desc.length > 150) return desc.substring(0,100);
	return desc;
};

const totalComments = (coment) => {
	return coment !== undefined && coment.Comentarios.length ? coment.Comentarios.length  : 0;
};


const PointCards = ({data}) => {
	return (
		<View>
			<Image/>
		</View>
	);
};


const LogbookView = ({rutaActual, setVisible}) => { 
	const [modalVisible, setModalVisible] = useState(false);
	const [ruta, setRuta] = useState(rutaActual);
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.mapContainer}>
				<Text>Map Container</Text>
			</View>
			<View style={styles.explorationButton}>
				<Ionicons name="card-outline" size={24} color="black" />
				<Text > Programar Exploracion</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>{ruta.Nombre}</Text>
				<View style={styles.raiting}>
					{/* <Text></Text> */}
					<Ionicons name="star-outline" color="green" size={18}/>
					<Text>{ruta.Puntuacion}</Text>
					<Ionicons name="compass-sharp" size={18} color="green" />
					<Text style={{fontWeight:"600"}}>{ruta.Dificultad}</Text>

				</View>
				<View style={styles.descriptionContainer}>
					<Text style={{textAlign:"justify"}}>{delimiteDescription(ruta.Descripcion)}</Text>
				</View>
				<Pressable onPress={() => {console.log("visitando los comentarios");
					setModalVisible(!modalVisible);    
				}}>
					<View style={styles.commentaryButton}>
						<Feather name="message-circle" size={18} color="green" />
        				<Text>{totalComments(ruta)}</Text>
					</View>
				</Pressable>
			</View>
			<Text>
				{JSON.stringify(ruta)}
			</Text>
			<Modal 
				visible={modalVisible} 
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
				presentationStyle="pageSheet"
				animationType="slide"


			>
				<ComentaryView Comentarys={ruta.Comentarios} id={ruta.id} updateRoute={setRuta}/>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container:{
		flex:1,
		marginTop:10,
		marginHorizontal:7
	},
	mapContainer:{
		flex:0.5,
		borderTopLeftRadius:18,
		borderTopRightRadius:18,
		backgroundColor:"green"
	},
	descriptionContainer:{
		// borderWidth:1,
		height:40,
		padding:2,
	},
	explorationButton:{
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center",
		height:30,
		backgroundColor:"pink",
		borderBottomRightRadius:18,
		borderBottomLeftRadius:18,
		// borderWidth:1,
	},
	infoContainer:{
		height:135,
		marginTop:5,
		gap:3,
		// borderWidth:1,
		marginBottom:2,
		// borderWidth:1,
		borderRadius:10,
		padding:3,
		shadowColor: "#000",
		backgroundColor:"white",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	title:{
		fontSize:20,
		textTransform:"capitalize",
		fontWeight:"600",
	},
	raiting:{
		flexDirection:"row",
		gap:5,
		justifyContent:"flex-star",
		// fontWeight:"500"
	},
	commentaryButton:{
		flexDirection:"row",
		justifyContent:"center",
		alignSelf:"center",
		width:100,
		gap:5,
		padding:5,
		borderWidth:1,
		borderRadius:100,
		backgroundColor:"#f2f2f2"
	},
	pointsContainer:{}

});

export default LogbookView;