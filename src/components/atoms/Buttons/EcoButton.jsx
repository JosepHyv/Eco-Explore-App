import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const EcoButton = ({ title, onPress, onLongPress = {}, color="#68A044" }) => {

	return (
		<Pressable
			style={[EcoButtonStyle.container, {backgroundColor:color}]}
			onPress={() => onPress()}
			onLongPress={() => {
				if (onLongPress) onLongPress();
			}}
		>
			<Text style={[EcoButtonStyle.title]}>{title}</Text>
		</Pressable>
	);
};

const EcoButtonStyle = StyleSheet.create({
	container: {
		backgroundColor: "#68A044",
		padding: 10,
		borderRadius: 100,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
		textAlign: "center",
		alignContent: "center",
	},
	title: {
		fontSize:20,
		fontWeight: "600",
		textAlign:"center",
		color: "#fff",
	},
});

export default EcoButton;
