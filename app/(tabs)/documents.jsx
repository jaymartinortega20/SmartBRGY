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
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import GradientHeader from "../../components/GradientHeader";

const Documents = () => {
  const [documentType, setDocumentType] = useState("Barangay Clearance");
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const handleSubmit = async () => {
    if (!purpose || !name || !phone) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "documents"), {
        documentType,
        purpose,
        name,
        phone,
        specialRequest,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Request submitted!");

      setPurpose("");
      setName("");
      setPhone("");
      setSpecialRequest("");
      setDocumentType("Barangay Clearance");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to submit request");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <GradientHeader title="Request Document" />

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>

            {/* DOCUMENT TYPE */}
            <Text style={styles.label}>Document Type *</Text>

            <View style={styles.pickerBox}>
              <Picker
                selectedValue={documentType}
                onValueChange={(value) => setDocumentType(value)}
                style={styles.picker}
              >
                <Picker.Item label="Barangay Clearance" value="Barangay Clearance" color="#000" />
                <Picker.Item label="Barangay ID" value="Barangay ID" color="#000" />
                <Picker.Item label="Certificate of Residency" value="Certificate of Residency" color="#000" />
                <Picker.Item label="Business Permit" value="Business Permit" color="#000" />
                <Picker.Item label="Other" value="Other" color="#000" />
              </Picker>
            </View>

            {/* PURPOSE */}
            <Text style={styles.label}>Purpose *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter purpose here..."
              placeholderTextColor="#888"
              value={purpose}
              onChangeText={setPurpose}
            />

            {/* NAME */}
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name..."
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />

            {/* PHONE */}
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter active phone number..."
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            {/* SPECIAL REQUEST */}
            <Text style={styles.label}>Special Request</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Optional message or instructions..."
              placeholderTextColor="#888"
              multiline
              value={specialRequest}
              onChangeText={setSpecialRequest}
            />

            {/* SUBMIT */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit Request</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default Documents;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    elevation: 5,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 5,
    color: "#222",
  },

  input: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    color: "#000",
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  pickerBox: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },

  picker: {
    color: "#000", // 🔥 FIX: BLACK TEXT
  },

  submitBtn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 12,
    marginTop: 15,
  },

  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
  },
});