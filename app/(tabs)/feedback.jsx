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
import GradientHeader from "../../components/GradientHeader";

const SubmitConcern = () => {
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const handleSubmit = () => {
    if (!subject || !details || !name || !phone) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    Alert.alert("Success", "Your concern has been submitted!");

    setSubject("");
    setDetails("");
    setName("");
    setPhone("");
    setSpecialRequest("");
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
            <Text style={styles.description}>
              Need assistance or have a concern? Please fill out the form below
              to contact your barangay for help.
            </Text>

            {/* Subject */}
            <Text style={styles.label}>Subject *</Text>
            <TextInput
              style={styles.input}
              placeholder="Briefly summarize your concern or request..."
              value={subject}
              onChangeText={setSubject}
            />

            {/* Details */}
            <Text style={styles.label}>Details *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Explain the reason for requesting this document."
              multiline
              value={details}
              onChangeText={setDetails}
            />

            {/* Contact */}
            <Text style={styles.sectionTitle}>Your Contact Information</Text>

            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Your Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            {/* Special Request */}
            <Text style={styles.label}>Special Request (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Include additional instruction or details if needed."
              multiline
              value={specialRequest}
              onChangeText={setSpecialRequest}
            />

            {/* Submit */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit Concern</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SubmitConcern;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  safe: {
    flex: 1,
  },

  container: {
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    elevation: 5,
  },

  description: {
    fontSize: 13,
    color: "#444",
    marginBottom: 10,
  },

  label: {
    fontWeight: "700",
    fontSize: 13,
    marginTop: 12,
    marginBottom: 6,
  },

  sectionTitle: {
    marginTop: 18,
    fontWeight: "800",
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cfcfcf",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fafafa",
    fontSize: 14,
  },

  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  half: {
    width: "48%",
  },

  submitBtn: {
    marginTop: 20,
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
});