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

import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import GradientHeader from "../../components/GradientHeader";

const Feedback = () => {
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const handleSubmit = async () => {
    if (!subject || !details || !name || !phone) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "feedbacks"), {
        subject,
        details,
        name,
        phone,
        specialRequest,
        status: "new",
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Concern submitted!");

      setSubject("");
      setDetails("");
      setName("");
      setPhone("");
      setSpecialRequest("");
    } catch (error) {
      Alert.alert("Error", "Failed to submit feedback");
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <GradientHeader title="Submit a Concern" />

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>

            <Text style={styles.label}>Subject *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter subject..."
              placeholderTextColor="#888"
              value={subject}
              onChangeText={setSubject}
            />

            <Text style={styles.label}>Details *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Explain your concern..."
              placeholderTextColor="#888"
              multiline
              value={details}
              onChangeText={setDetails}
            />

            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name..."
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number..."
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>Special Request</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Optional notes..."
              placeholderTextColor="#888"
              multiline
              value={specialRequest}
              onChangeText={setSpecialRequest}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit Concern</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  container: {
    padding: 16,
  },

  // SAME STYLE AS DOCUMENTS
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