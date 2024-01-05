import React from "react";
import AnimatedTextInput from "react-native-animated-placeholder-textinput";
import { StyleSheet } from "react-native";

const InputLabel = ({
	placeholder = "Type Here",
	value,
	onChangeText,
	keyboardType = "default",
	secureTextEntry,
	// autoCapitalize = "none",
	// autoCorrect = "none",
	...rest
}) => {
	return (
		<AnimatedTextInput
			{...labelStyle.Config}
			placeholder={placeholder}
			value={value}
			keyboardType={keyboardType}
			secureTextEntry={secureTextEntry}
			onChangeText={(entrada) => {
				console.log(entrada);
				onChangeText(entrada);
			}}
		/>
	);
};

const labelStyle = StyleSheet.create({
	Config: {
		width:"100%",
		padding: 10,
		borderWidth: 1,
		borderColor: "#68A044",
		backgroundColor:"#fff",
		// placeholderTextColor: "#68A044",
		// placeholderBackgroundColor:"transparent",
		borderRadius: 10,
		alignItems: "stretch",
	},
});

export default InputLabel;
