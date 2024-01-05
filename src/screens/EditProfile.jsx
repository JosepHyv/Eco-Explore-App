import React from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, Pressable } from "react-native";
import InputLabel from "../components/atoms/Inputs/InputLabel";
import EcoButton from "../components/atoms/Buttons/EcoButton";
import useUserStore from "../hooks/UserStore";
import useTokenStore from "../hooks/TockenStore";
import * as LocalStorage from "../hooks/LocalStorage";
const EditProfile = ({ navigation }) => {
	// const { name = "Jose", lastName = "Hernandez Gonzalez", email = "Jose@email.com", location = "Xalapa, Veracruz" } = route.params || {};
	const {setToken} = useTokenStore();
	const {usuario} = useUserStore();

	const CerrarSesion = () => {
		LocalStorage.removeValue("token").then(() => {
			setToken({});
			navigation.navigate("IniciarSesion");
		}).catch(() => {});
	};

	const ImageUri = (element) => {
		if(!element.length){
			return require("../../assets/perfil-no-encontrado.png");
		}
		else
			return {uri:element};
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Perfil</Text>
			<View style={{alignItems:"center"}}>
				<View style={styles.imageContainer}>
					<Pressable onPress={() => {console.log("Actualizar imagen");}}>
					    <Image style={styles.image} source={ImageUri(usuario.UrlImagen)} />

					</Pressable>
				</View>
			</View>
			<View style={styles.rowContainer}>
				<View style={styles.columnContainer}>
					<InputLabel placeholder={usuario.Nombre} />
				</View>
				<View style={styles.columnContainer}>
					<InputLabel placeholder={usuario.ApellidoPaterno} />
				</View>
			</View>
			<View style={styles.inputLabel}>
				<InputLabel  placeholder={usuario.Email} />
			</View>
			<View style={styles.inputLabel}>
				<InputLabel  placeholder={usuario.Telefono} />
			</View>
			{/* <View style={styles.inputLabel}>
				<InputLabel placeholder={location} style={styles.inputLabel}  />
			</View> */}
			<View style={{flex:1, justifyContent:"center",gap:15}}>
				<EcoButton title={"Guardar"} onPress={() => console.log("¡ Saved !")} style={styles.button}/>
				<EcoButton title={"Cerrar Sesión"} onLongPress={() => CerrarSesion()} style={styles.button} color='red'/>

			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		gap:10,
		backgroundColor:"#fff"
	},
	imageContainer:{
		height:250,
		marginVertical:10,
		width:250,
		alignItems:"center",
		borderRadius:300,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.3,

		elevation: 13,

	},
	image:{
		height:"100%",
		width:250,
		resizeMode: "stretch",
		borderRadius: 300,
        
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	rowContainer: {
		flexDirection: "row",
		gap:5,
		justifyContent: "space-between",
		// marginBottom: 16,
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