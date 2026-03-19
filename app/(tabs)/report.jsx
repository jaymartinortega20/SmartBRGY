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
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import GradientHeader from "../../components/GradientHeader";

const ReportIncident = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Disturbance");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const incidentTypes = [
    "Disturbance",
    "Theft",
    "Accident",
    "Vandalism",
    "Other",
  ];

  // 📸 PICK IMAGE
  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // 🚀 SUBMIT
  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill in required fields.");
      return;
    }

    Alert.alert("Success", "Incident Report Submitted!");

    // CLEAR FORM
    setTitle("");
    setDescription("");
    setName("");
    setPhone("");
    setPhoto(null);
    setType("Disturbance");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <GradientHeader title="Report an Incident" />

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>

            {/* TITLE */}
            <Text style={styles.label}>Report Title *</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Briefly describe the incident"
              style={styles.input}
              placeholderTextColor="#777"
            />

            {/* INCIDENT TYPE */}
            <Text style={styles.label}>Incident Type</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={styles.dropdownText}>{type}</Text>
              <Ionicons name="chevron-down" size={18} color="#555" />
            </TouchableOpacity>

            {showDropdown &&
              incidentTypes.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.option}
                  onPress={() => {
                    setType(item);
                    setShowDropdown(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}

            {/* DESCRIPTION */}
            <Text style={styles.label}>Description *</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholder="Provide a detailed description..."
              style={[styles.input, styles.textArea]}
              placeholderTextColor="#777"
            />

            {/* PHOTO */}
            <Text style={styles.label}>Photo (Optional)</Text>
            <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
              <Ionicons name="image-outline" size={20} color="#4caf50" />
              <Text style={styles.photoText}>Attach Photo</Text>
            </TouchableOpacity>

            {photo && (
              <Image source={{ uri: photo }} style={styles.preview} />
            )}

            {/* CONTACT INFO */}
            <Text style={styles.section}>
              Your Contact Info (Optional)
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
              style={styles.input}
              placeholderTextColor="#777"
            />

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              style={styles.input}
              placeholderTextColor="#777"
            />

            {/* SUBMIT BUTTON */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>
                Submit Report
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  container: {
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    elevation: 4,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    color: "#333",
  },

  input: {
    backgroundColor: "#f3f3f3",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    marginBottom: 12,
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  dropdown: {
    backgroundColor: "#f3f3f3",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    fontSize: 13,
    color: "#333",
  },

  option: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },

  photoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e8f5e9",
    padding: 10,
    borderRadius: 6,
    marginBottom: 14,
  },

  photoText: {
    color: "#4caf50",
    fontWeight: "700",
    fontSize: 13,
  },

  preview: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },

  section: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
    color: "#333",
  },

  submitBtn: {
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  submitText: {
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
    fontSize: 14,
  },
});

export default ReportIncident;