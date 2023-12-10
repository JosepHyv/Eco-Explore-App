import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import EcoButton from "../components/atoms/Buttons/EcoButton";
import EcoExplore from "../../assets/logos/EcoExplore.svg";
import InputLabel from "../components/atoms/Inputs/InputLabel";


const LogIn = () => { 
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
			<InputLabel placeholder="Direccion de Correo"/>
			<InputLabel placeholder="Contraseña"/>

			<EcoButton title={"Iniciar Sesion"} onPress={() => console.log("presset")} style={style.button}/>
			<Text style={style.subtitle}>¿Has olvidado tu contraseña?</Text>
		</SafeAreaView>
	);
};


const style = StyleSheet.create({
	container:{
		flex:1,
		gap:20,
		alignItems:"stretch",
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