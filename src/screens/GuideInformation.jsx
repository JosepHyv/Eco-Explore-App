import React from "react";
import { SafeAreaView, Text, StyleSheet, Image, View } from "react-native";
import StarRating from "react-native-star-rating";
import EcoButton from "../components/atoms/Buttons/EcoButton";

const GuideInformation = ({ route }) => {
  const { guideName, location, rating, phoneNumber, profileImageUri } =
    route.params;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Guía</Text>
      </View>
      <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
      <Text style={styles.name}>{guideName}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.rating}>{rating}</Text>

      <StarRating
        disabled={true}
        maxStars={5}
        rating={rating}
        fullStarColor={"#FFD700"}
        style={styles.stars}
      />
      <View style={styles.buttonContainer}>
        <EcoButton
          title={`Contactar a ${guideName}`}
          onPress={() =>
            console.log(
              `Contactar a ${guideName} presionado. Teléfono: ${phoneNumber}`
            )
          }
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "left",
    color: "#68A044",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#68A044",
    textTransform: "uppercase",
  },
  location: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  rating: {
    fontSize: 92,
    fontWeight: "900",
    marginVertical: 10,
    textAlign: "right",
  },
  stars: {
    alignItems: "stretch",
    starSize: 50,
    color: "68A044",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default GuideInformation;
