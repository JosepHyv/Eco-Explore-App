import React from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, View, Image } from "react-native";

const AvailableGuides = ({ route }) => {
	const guides = route.params.guides || [];

	const renderGuideItem = ({ item }) => (
		<TouchableOpacity>
			<View style={styles.guideContainer}>
				<Text style={styles.itemName}>{item.guideName}</Text>
				<Text style={styles.itemLocation}>{item.location}</Text>
				<Image source={{ uri: item.profileImageUri }} style={styles.itemImage} />
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Guías disponibles</Text>
			<FlatList
				data={guides}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderGuideItem}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	guideContainer: {
		marginBottom: 16, // Agrega un espacio entre cada guía
	},
	itemName: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	itemLocation: {
		fontSize: 16,
		marginBottom: 8,
	},
	itemImage: {
		width: 100,
		height: 100,
		resizeMode: "cover",
		borderRadius: 50,
	},
});

export default AvailableGuides;
