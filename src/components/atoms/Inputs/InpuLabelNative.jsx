import React from "react";
import { useState } from "react";
import { TextInput, View, StyleSheet, Pressable,KeyboardAvoidingView,Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const InputLabelNative = ({onChangeText = () => {}, placeholder = "", keyboardType ="default", editable = true, multiline = false, maxLength = 100, value, password = false}) => {
	const [visible, setVisible] = useState(password);
	return (
		<KeyboardAvoidingView style={style.container}
			behavior={Platform.OS === "ios" ? "padding" : ""}   
		>
			<TextInput
				style={{flex:1, verticalAlign:"middle"}}
				placeholder={placeholder}
				editable={editable}
				multiline={multiline}
				// numberOfLines={4}
				secureTextEntry={visible}
				keyboardType={keyboardType}
				maxLength={maxLength}
				onChangeText={text => onChangeText(text)}
				value={value}
				// style={{padding: 10}}
			/>
			<>
				{password? 
					<Pressable onPress={() => setVisible(!visible)}>

						<View>
							<>
								{
									!visible ?
										<Ionicons name="eye" size={24} color="black" />
										:
										<Ionicons name="eye-off" size={24} color="black" />

								}
							</>
						</View> 
					</Pressable>			
					:
					<></>}
			</>

		</KeyboardAvoidingView>
	);
};

const style = StyleSheet.create({
	container:{
		// flex:1,
		// alignContent:"stretch",
		// alignItems:"stretch",
		justifyContent:"space-around",
		width:"100%",
		flexDirection:"row",
		padding:5,
		borderWidth:1,
		borderRadius:10,
		color:"black",
		backgroundColor:"#fff",
		borderColor : "#68A044"
	}
});

export default InputLabelNative;