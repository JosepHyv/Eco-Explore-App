import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const cutDescription = (desc) => {
	if (desc.length > 130) {
		const sub = desc.slice(0, 130) + "...";
		return sub;
	}
	return desc;
};

const cutTitle = (title) => {
	if (title.length > 50) {
		const sub = title.slice(0, 47) + "...";
		return sub;
	}
	return title;
};

const formatRaiting = (rate) => Number(rate).toFixed(1);


const Card = ({
	dificulty,
	raiting,
	totalVotes,
	title,
	description,
	imageUri,
	onPress,
}) => {
	return (
		<Pressable onPress={(event) => onPress(event)}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={imageUri} />
				</View>
				<View style={styles.detailsContainer}>
					<View style={styles.subheader}>
						<Text style={styles.dificultTitle}>{dificulty}</Text>
						<Ionicons name="ios-star-outline" size={20} color="green" />
						<Text style={styles.raintingTitle}>{formatRaiting(raiting)}</Text>
						<Text style={styles.raintingTitle} s>
              ({totalVotes})
						</Text>
					</View>

					<Text style={styles.title}>{cutTitle(title)}</Text>
					<Text style={styles.descriptionTitle}>
						{cutDescription(description)}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		height: 330,
		width: 400,
		// borderWidth:1,
		alignContent: "center",
		verticalAlign: "middle",
	},
	detailsContainer: {
		flexDirection: "column",
		marginTop: 5,
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
		height: 230,
		width: "100%",
		borderRadius: 20,
		alignSelf: "center",
		// padding:10,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.3,

		elevation: 13,
		// borderWidth:1
	},
	subheader: {
		flexDirection: "row",
		// borderWidth:1,
		gap: 5,
		alignItems: "center",
	},
	image: {
		height: 230,
		width: "100%",
		resizeMode: "stretch",
		borderRadius: 20,
	},
});

export default Card;