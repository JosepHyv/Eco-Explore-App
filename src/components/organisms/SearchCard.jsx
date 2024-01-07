import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const cutTitle = (title) => {
	if (title.length > 50) {
		const sub = title.slice(0, 47) + "...";
		return sub;
	}
	return title;
};

const formatRaiting = (rate) => Number(rate).toFixed(1);


const SearchCard = ({
	dificulty,
	raiting,
	title,
	imageUri,
	onPress = () => {},

}) => {
	return (
		<Pressable onPress={() => {
			console.log("precionada");
			onPress();
		}}>
			<View style={[styles.container]}>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={imageUri} />
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.title}>{cutTitle(title)}</Text>
					<View style={styles.subheader}>
						<Text style={styles.dificultTitle}>{dificulty}</Text>
						<Ionicons name="ios-star-outline" size={20} color="green" />
						<Text style={styles.raintingTitle}>{formatRaiting(raiting)}</Text>
                        
					</View>
				</View>
				{/* <Pressable onPress={(event) => onPress(event)}>
                </Pressable> */}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flex:1,
		marginHorizontal:5,
		marginVertical:10,
		height: 250,
		flexDirection: "column",
		// borderWidth:1,
		alignContent: "center",
		verticalAlign: "middle",
		borderRadius: 20,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,

		elevation: 7,
        
	},
	detailsContainer: {
		flexDirection: "row",
		backgroundColor:"#effcf4",
		height:50,
		alignItems:"center",
		justifyContent:"space-around",
		gap:20,
		borderBottomLeftRadius:20,
		borderBottomRightRadius:20,
		// borderWidth:1,
	},
	dificultTitle: {
		fontWeight: "500",
		fontSize: 16,
		textTransform: "capitalize",
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		textTransform: "capitalize",
	},
	descriptionTitle: {
		flexWrap: "wrap",
		width: "75%",
	},
	raintingTitle: {
		fontWeight: "300",
		fontSize: 16,
		textTransform: "capitalize",
	},
	imageContainer: {
		flex:1,
		height:200,
		width:"100%",
	},
	subheader: {
		height:50,
		flexDirection: "row",

		gap: 5,
		alignItems: "center",
	},
	image: {
		height: 200,
		width: "100%",
		resizeMode: "cover",
		// borderRadius: 20,
		borderTopLeftRadius:20,
		borderTopRightRadius:20,

	},
});

export default SearchCard;
