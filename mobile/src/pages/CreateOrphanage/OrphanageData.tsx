import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import api from "../../services/api";

interface routesParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

export default function OrphanageData() {
  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params as routesParams;
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  async function submit() {
    let { latitude, longitude } = params.position;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("instructions", instructions);
    formData.append("opening_hours", opening_hours);
    formData.append("open_on_weekends", String(open_on_weekends));
    formData.append("latitude", String(latitude));
    formData.append("longitude", String(longitude));

    images.forEach((img, i) =>
      formData.append("images", {
        name: `img_${i}.jpg`,
        type: "image/jpg",
        uri: img,
      } as any)
    );

    await api.post("orphanages", formData);

    navigation.navigate("OrphanagesMap");
    ToastAndroid.show("Cadastro realizado com sucesso!", 1500);
  }

  async function selectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      alert("Libera o acesso ae menó");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
    });

    if (result.cancelled) {
      return;
    }

    setImages([...images, result.uri]);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        onChangeText={setAbout}
        value={about}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map((img, i) => (
          <Image source={{ uri: img }} style={styles.uploadedImage} key={i} />
        ))}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={selectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        onChangeText={setInstructions}
        value={instructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        onChangeText={setOpeningHours}
        value={opening_hours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          onValueChange={setOpenOnWeekends}
          value={open_on_weekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={submit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: "#5c8599",
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: "#D3E2E6",
  },

  label: {
    color: "#8fa7b3",
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: "#8fa7b3",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
  },

  uploadedImagesContainer: {
    flexDirection: "row",
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#96D2F0",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
});
