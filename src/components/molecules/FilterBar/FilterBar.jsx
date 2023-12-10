import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import SelectInputNative from "../../atoms/Inputs/SelectInputNative";

const Example = ({ setVisible }) => {
	return (
		<View
			style={{
				borderWidth: 1,
				flex: 1,
				flexDirection: "column",
				margin: 10,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					fontSize: 30,
					fontWeight: "500",
					textAlign: "center",
					color: "black",
				}}
			>
        Hola esto es una prueba
			</Text>
			<Button title="Holiwi" onPress={() => setVisible(false)} />
		</View>
	);
};

const FilterBar = () => {
	return (
		<View style={style.container}>
			<SelectInputNative placeholder={"Puntuación"} renderModal={Example} />
			<SelectInputNative placeholder={"Dificultad"} renderModal={Example} />
			<SelectInputNative placeholder={"Actividad"} renderModal={Example} />
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 5,
		justifyContent: "space-around",
	},
});
export default FilterBar;
