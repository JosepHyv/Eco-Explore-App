import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, FlatList, Pressable,KeyboardAvoidingView, Platform,InputAccessoryView } from "react-native";
import axios from "axios";
import { eco_explore_api } from "../utils/ApiUtils";
import { Loading, EmptyCarrousell } from "../components/organisms/States";
import StarRating from "react-native-star-rating-widget";
import InputLabelNative from "../components/atoms/Inputs/InpuLabelNative";
import useTokenStore from "../hooks/TockenStore";
import { Ionicons } from "@expo/vector-icons";
import InputIcon from "../components/molecules/InputIcon/InputIcon";

const KeyboardView = Platform.OS === "ios" ? InputAccessoryView : View;

const Comentary = ({Evaluation, Comment}) => {
	return (
		<View style={styles.commentCard}>
			<Text style={styles.comment}>{Comment}</Text>
			<StarRating
				rating={Evaluation}
				onChange={() => {}}
				color={"#68A044"}
				starSize={20}
			/>
		</View>
	);
};



const ComentaryView = ({Comentarys}) => {
	const [comentarios, setComentarios] = useState([]);
	const [loading, setIsLoading] = useState(true);
	const {token} = useTokenStore();
	const [nuevoComentario, setNuevo] = useState("");
	// const [error, setError] = useState(false);

	useEffect(() => {
		// console.log(JSON.stringify(Comentarys));
		const url = eco_explore_api + "/bitacoras/comentarios";
		const body = {
			Comentarios: Comentarys
		};
		axios.post(url, body).then((response) => {
			setIsLoading(false);
			if(response.data.Comentarios.length)
			{
				// console.log(response.data.Comentarios);
				setComentarios(response.data.Comentarios);
			}
			else{
				setComentarios([]);
			}
		}).catch(() => {
			setIsLoading(false);
			// console.log("error recuperando los comentarios");
			setComentarios([]);
		});
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.titulo}>
                Comentarios
			</Text>
			<>
				{loading? 
					<Loading/>
					:
					<>
						{!comentarios.length? <EmptyCarrousell title="Ocurrio un problema al recuperar los comentarios"/> : 
							<View style={styles.commentArea}>
								<View style={styles.cardArea}>
									<FlatList
										contentContainerStyle={{ marginVertical:5, gap:15}}
										data={comentarios}
										renderItem={({item}) => 
											<Comentary 
												Evaluation={item.Evaluacion} 
												Comment={item.Comentario}/>}  
										// keyExtractor={item => item.id}
										style={{flex:1}}
									/>
								</View>
								<>
									{token.access_token? 
										<KeyboardView  style={styles.insertArea}>
											<InputIcon placeholder="Ingresa Un Comentario." value={nuevoComentario} onTextChange={(value) => setNuevo(value)} iconName={"arrow-up-circle"} color={"green"} onPress={() => {console.log(nuevoComentario);}}/>
										</KeyboardView> :
										<></>
									}
								</>
							</View>
							// <Text>{JSON.stringify(comentarios)}</Text>
						}
					</>
				}
			</>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container:{
		flex:1, 
		margin:10,
		// borderWidth:1,
	},
	activity:{
		flex:1,
		justifyContent:"center",
	},
	commentCard:{
		height:"auto",
		gap:10,
		justifyContent:"center", 
		alignItems:"center",
		padding:10, 
		margin:5,
		borderRadius:18,
		shadowColor: "#000",
		backgroundColor:"#fff",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		// borderWidth:0.1
	},
	comment:{
		fontSize:14,
		fontWeight:"400",
		textAlign:"justify"
	},
	titulo:{
		fontSize:30,
		textAlign:"center",
		fontWeight:"600",
		margin:5
	},
	commentArea:{
		flex:1,
		// borderWidth:1,
		marginBottom:10,
		flexDirection:"column"
	},
	cardArea:{
		flex:1
	},
	insertArea: {
		// flex:0.1,
		// flex:0.1,
		width:"100%",
		// height:150,
		alignSelf:"flex-start",
		flexDirection:"row",
		// borderWidth:1
	},
});

export default ComentaryView;