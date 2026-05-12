import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import GradientHeader from "../../components/GradientHeader";

const Report = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [details, setDetails] = useState("");
  const [photo, setPhoto] = useState(null);

  // 📸 IMAGE PICKER
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // 🚀 SUBMIT TO FIREBASE (ADMIN REALTIME)
  const handleSubmit = async () => {
    if (!name || !phone || !location || !incidentType) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "reports"), {
        name,
        phone,
        location,
        incidentType,
        details,
        photo,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Report submitted!");

      setName("");
      setPhone("");
      setLocation("");
      setIncidentType("");
      setDetails("");
      setPhoto(null);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to submit report");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <GradientHeader title="Report Incident" />

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>

            {/* IMAGE PICKER */}
            <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.image} />
              ) : (
                <Text style={styles.imageText}>
                  Tap to add incident photo
                </Text>
              )}
            </TouchableOpacity>

            {/* INPUTS (DOCUMENT STYLE UI) */}
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter location of incident"
              placeholderTextColor="#999"
              value={location}
              onChangeText={setLocation}
            />

            <TextInput
              style={styles.input}
              placeholder="Incident type (e.g. Theft, Fire)"
              placeholderTextColor="#999"
              value={incidentType}
              onChangeText={setIncidentType}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe what happened..."
              placeholderTextColor="#999"
              multiline
              value={details}
              onChangeText={setDetails}
            />

            {/* SUBMIT */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit Report</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Report;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  container: {
    padding: 16,
  },

  // SAME AS DOCUMENT UI
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    elevation: 4,
  },

  input: {
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  submitBtn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  submitText: {
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
  },

  imageBox: {
    backgroundColor: "#f3f3f3",
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  imageText: {
    color: "#999",
    fontWeight: "600",
  },
});