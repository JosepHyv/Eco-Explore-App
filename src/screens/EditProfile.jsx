import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import InputLabel from "../components/atoms/Inputs/InputLabel";
import EcoButton from "../components/atoms/Buttons/EcoButton";
import useUserStore from "../hooks/UserStore";
import useTokenStore from "../hooks/TockenStore";
import axios from "axios";
import * as LocalStorage from "../hooks/LocalStorage";

const EditProfile = ({ navigation }) => {
	const { token } = useTokenStore();
	const { usuario } = useUserStore();
	const [nombre, setNombre] = useState(usuario.Nombre);
	const [apellidoPaterno, setApellidoPaterno] = useState(usuario.ApellidoPaterno);
	const [apellidoMaterno, setApellidoMaterno] = useState(usuario.ApellidoMaterno);
	const [email, setEmail] = useState(usuario.Email);
	const [telefono, setTelefono] = useState(usuario.Telefono);
	const user_id = usuario.id;
	const [imageUri, setImageUri] = useState(usuario.UrlImagen);
	const BASE_API_URL = "http://ec2-3-137-140-200.us-east-2.compute.amazonaws.com:8000";

	useEffect(() => {
		setNombre(usuario.Nombre);
		setApellidoMaterno(usuario.apellidoMaterno);
		setApellidoPaterno(usuario.ApellidoPaterno);
		setEmail(usuario.Email);
		setTelefono(usuario.Telefono);
		setImageUri(usuario.ImageUri);
		requestGalleryPermission();
		console.log(JSON.stringify(usuario));
	}, []);

	const requestGalleryPermission = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			Alert.alert("Permisos insuficientes", "Se requieren permisos para acceder a la galería de fotos.");
		}
	};
	const handleUpdatePhoto = async () => {
		try {
		  const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
		  });
		  
		  console.log("Resultado:",result);
		  
		  if (result.cancelled || result.error) {
				console.log("Selección de imagen cancelada o error", result.error);
		  } else {
			
				const formData = new FormData();
				formData.append("photo",
					{uri: result._parts[0][1].assets[0].uri}
				);
				console.log(result);
				const config = {
			  headers: {
						"Content-Type": "multipart/form-data",
						"Authorization": "Bearer " + token.access_token,
			  },
				};
	  
				console.log("Datos en FormData:", formData);
				console.log("Config: ", config);
	  
				axios.post(`http://ec2-3-137-140-200.us-east-2.compute.amazonaws.com:8000/usuarios/${user_id}/actualizar/foto`, formData, config)
			  .then((response) => {
						console.log("Respuesta del servidor:", response.data);
						setImageUri(response.data.url);
			  })
			  .catch((error) => {
						console.error("Error al actualizar la foto:", JSON.stringify(error,null,4));
			  });
		  }
		} catch (error) {
		  console.error("Error al seleccionar la imagen:", error);
		}
	  };
	  

	const ImageUri = (element) => {
		if (!element || !element.length) {
		  return require("../../assets/perfil-no-encontrado.png");
		} else {
		  return { uri: element + "?" + Date.now().toString().substring(0,10) + "000"};
		}
	  };
	  
	  const CerrarSesion = () => {
		LocalStorage.removeValue("token").then(() => {
			setToken({});
			navigation.navigate("IniciarSesion");
		}).catch(() => {});
	};

	const handleGuardar = async () => {
		try {
			if (!nombre.length || !apellidoMaterno.length || !apellidoPaterno.length || !telefono.length || !email.length) {
				Alert.alert("Debes llenar todos los campos");
				return;
			}

			const response = await axios.put(`/usuarios/${user_id}/actualizar/perfil`, {
				nombre,
				apellidoPaterno,
				apellidoMaterno,
				email,
				telefono,
			});

			console.log("Respuesta del servidor:", response.data);
		} catch (error) {
			console.error("Error al actualizar el perfil:", error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Perfil</Text>
			<View style={{ alignItems: "center" }}>
				<View style={styles.imageContainer}>
					<Pressable onPress={handleUpdatePhoto}>
						<Image style={styles.image} source={ImageUri(usuario.UrlImagen)} />
					</Pressable>
				</View>
			</View>
			<View style={styles.rowContainer}>
				<View style={styles.columnContainer}>
					<InputLabel placeholder={nombre} value={nombre} onChangeText={(value) => setNombre(value)} />
				</View>
				<View style={styles.columnContainer}>
					<InputLabel placeholder={usuario.ApellidoPaterno} value={apellidoPaterno} onChangeText={(value) => setApellidoPaterno(value)} />
				</View>
				<View style={styles.columnContainer}>
					<InputLabel placeholder={usuario.ApellidoMaterno} value={apellidoMaterno} onChangeText={(value) => setApellidoMaterno(value)} />
				</View>
			</View>
			<View style={styles.inputLabel}>
				<InputLabel placeholder={usuario.Email} value={email} onChangeText={(value) => setEmail(value)} />
			</View>
			<View style={styles.inputLabel}>
				<InputLabel placeholder={usuario.Telefono} value={telefono} onChangeText={(value) => setTelefono(value)} />
			</View>
			<View style={{ flex: 1, justifyContent: "center", gap: 15 }}>
				<EcoButton title={"Guardar"} onPress={handleGuardar} style={styles.button} />
				<EcoButton title={"Cerrar Sesión"} onPress={() => CerrarSesion()} style={styles.button} color='red' />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
		backgroundColor: "#fff",
	},
	imageContainer: {
		height: 250,
		marginVertical: 10,
		width: 250,
		alignItems: "center",
		borderRadius: 300,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.3,
		elevation: 13,
	},
	image: {
		height: "100%",
		width: 250,
		resizeMode: "stretch",
		borderRadius: 300,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	rowContainer: {
		flexDirection: "row",
		gap: 5,
		justifyContent: "space-between",
	},
	columnContainer: {
		flex: 2,
	},
	inputLabel: {
		marginBottom: 8,
	},
	button: {
		fontSize: 20,
		textTransform: "uppercase",
		textAlign: "center",
	},
});

export default EditProfile;
