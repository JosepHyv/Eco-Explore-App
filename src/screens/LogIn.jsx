import React from "react";
import { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, Alert, Pressable } from "react-native";
import EcoButton from "../components/atoms/Buttons/EcoButton";
import EcoExplore from "../../assets/logos/EcoExplore.svg";
import InputLabel from "../components/atoms/Inputs/InputLabel";
import { eco_explore_api } from "../utils/constants";
import axios from "axios";
import * as LocalStorage from "../hooks/LocalStorage";
import useTokenStore from "../hooks/TockenStore";


const LogIn = ({navigation}) => { 
	const [email, setEmail] = useState("");
	const [contra, setContra] = useState("");
	const {setToken} = useTokenStore();

	
	const VerificateLogIn = (mail, password) => {
		if(!mail.length || !password.length){
			Alert.alert("Debes ingresar tu email y contraseña");
		}
		else{
			const data = {
				"username": mail, 
				"password": password
			};
			const config = {headers: { "content-type": "application/x-www-form-urlencoded" }};
			const url = eco_explore_api + "/" + "token";
			axios.post(url, data, config)
				.then((res) => {
					console.log(res.data);
					LocalStorage.storeData("token", res.data).then(() => {
						setToken(res.data);
						navigation.navigate("Explorar");
					});
				}).catch((res) => {
					Alert.alert("El usuario o la contraseña son invalidos");

				});
			
		}
	};
	
	return ( 
		<SafeAreaView style={style.container}>
			<View style={style.presentationContainer}>
				<View style={style.logo}>
					<EcoExplore width={160} height={160} style={{margin:5}}/>
				</View>
				<Text style={style.title}>
					eco explore
				</Text>
			</View>
			<InputLabel placeholder="Direccion de Correo" value={email} onChangeText={(value) => setEmail(value)}/>
			<InputLabel placeholder="Contraseña" value={contra} onChangeText={(value) => setContra(value)}/>

			<EcoButton title={"Iniciar Sesion"} onPress={() => VerificateLogIn(email, contra)}/>
			<Pressable onPress={() => navigation.navigate("CrearCuenta")}>
				<Text style={style.subtitle}>¿No tienes cuenta? Crea Una!</Text>
			</Pressable>
		</SafeAreaView>
	);
};


const style = StyleSheet.create({
	container:{
		flex:1,
		paddingHorizontal:7,
		gap:20,
		// alignItems:"stretch",
		backgroundColor:"#fff"
	},
	logo:{
		width:"100%",
		// borderWidth:1,
		alignItems:"center"
	},
	presentationContainer:{
		marginVertical:20,
		width:"100%", 
		height:225,
		gap:10,
		// borderWidth:1,
		flexDirection:"column",
		justifyContent:"center",
	},
	imageContainer:{
		flex:0.5,
		backgroundColor:"green"
	},
	title:{
		fontSize:30, 
		fontWeight:"700",
		textAlign:"center",
		// borderWidth:1,
		color:"#68A044",
		textTransform:"uppercase"
	},
	subtitle:{
		fontSize:15,
		paddingHorizontal:10,
		fontWeight:"400",
		borderBottomWidth:1,
		textAlign:"center",
		alignSelf:"center",
		// textTransform:"capitalize"

	},
	button:{
		fontSize:20, 
		textTransform:"uppercase",
		textAlign:"center"
	}
});

export default LogIn;