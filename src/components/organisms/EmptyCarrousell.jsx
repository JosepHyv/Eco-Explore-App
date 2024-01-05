import React from "react";
import { View,  Text, StyleSheet } from "react-native";




const EmptyCarrousell = ({
	title = "No hay Tarjetas para mostrar 😔"
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor:"#E6E6E6",
		// opacity:0.5,
		borderWidth:0.8,
		borderRadius:20,
		flexDirection: "column",
		flexWrap:"wrap",
		height: 340,
		width: 370,
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
	
});

export default EmptyCarrousell;
