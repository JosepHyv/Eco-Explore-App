import React  from "react";
import { TextInput, View, StyleSheet, Pressable, InputAccessoryView, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const KeyboardView = Platform.OS === "ios" ? InputAccessoryView : View;
const InputIcon = ({ placeholder, value, onTextChange,onPress, iconName, color }) => {
	return (
		<KeyboardView>
			<View style={styles.container}>
				<TextInput
					style={styles.textInput}
					placeholder={placeholder}
					value={value}
					onChangeText={(content) => onTextChange(content)}
				/>
				<View>
					<Pressable onPress={(value) => onPress(value)}>
						{/* <Ionicons name="fclose-circle" size={20} /> */}
						<Ionicons name={iconName} size={25} color={color} />
					</Pressable> 
				</View>
			</View>
		</KeyboardView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		margin: 3,
		padding:10,
		gap: 5,
		borderColor: "#68A044",
		borderWidth: 1,
		borderRadius: 100,
		justifyContent: "flex-start",
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	iconContainer: {
		marginHorizontal: 5,
		justifyContent: "flex-start",
		alignSelf: "center",
		// borderWidth: 1,
	},
	textInput: {
		// flex: 1,
		width:"100%",
		alignSelf: "stretch",
		paddingHorizontal: 5,
		fontSize: 15,
		// borderWidth: 1,
		// gap: 5,
	},
});

export default InputIcon;
