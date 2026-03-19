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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import GradientHeader from "../../components/GradientHeader";

const RequestDocument = () => {
  const [documentType, setDocumentType] = useState("Barangay Clearance");
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <GradientHeader title="Request a Document" />

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            {/* Document Type */}
            <Text style={styles.label}>Document Type *</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={documentType}
                onValueChange={setDocumentType}
              >
                <Picker.Item label="Barangay Clearance" value="Barangay Clearance" />
                <Picker.Item label="Barangay ID" value="Barangay ID" />
                <Picker.Item label="Certificate of Residency" value="Certificate of Residency" />
                <Picker.Item label="Business Permit" value="Business Permit" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            {/* Purpose */}
            <Text style={styles.label}>Purpose *</Text>
            <TextInput
              style={styles.input}
              placeholder="Explain the reason for requesting this document."
              multiline
              value={purpose}
              onChangeText={setPurpose}
            />

            {/* Contact Info */}
            <Text style={styles.sectionTitle}>Your Contact Information</Text>

            <Text style={styles.label}>Your Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            {/* Special Request */}
            <Text style={styles.label}>Special Request (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Include any additional instructions or details if needed."
              multiline
              value={specialRequest}
              onChangeText={setSpecialRequest}
            />

            {/* Submit */}
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RequestDocument;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  container: {
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },

  label: {
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 12,
    fontSize: 13,
  },

  sectionTitle: {
    marginTop: 18,
    fontWeight: "800",
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#646464ff",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fafafa",
    marginBottom: 4,
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#575757ff",
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