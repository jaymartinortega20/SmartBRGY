import React from "react";
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
import { Ionicons } from "@expo/vector-icons";
import GradientHeader from "../../components/GradientHeader";

const ReportIncident = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>

        <GradientHeader title="Report an Incident" />

        <ScrollView contentContainerStyle={styles.container}>

          {/* CARD */}
          <View style={styles.card}>

            {/* REPORT TITLE */}
            <Text style={styles.label}>Report Title:</Text>
            <TextInput
              placeholder="Briefly describe the incident"
              style={styles.input}
              placeholderTextColor="#777"
            />

            {/* INCIDENT TYPE */}
            <Text style={styles.label}>Incident Type:</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>Disturbance</Text>
              <Ionicons name="chevron-down" size={18} color="#555" />
            </View>

            {/* DESCRIPTION */}
            <Text style={styles.label}>Description:</Text>
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="Provide a detailed description of what happened. Include any relevant details and the exact location."
              style={[styles.input, styles.textArea]}
              placeholderTextColor="#777"
            />

            {/* PHOTO */}
            <Text style={styles.label}>Photo (Optional)</Text>
            <TouchableOpacity style={styles.photoBtn}>
              <Ionicons name="image-outline" size={20} color="#4caf50" />
              <Text style={styles.photoText}>Attach Photo</Text>
            </TouchableOpacity>

            {/* CONTACT INFO */}
            <Text style={styles.section}>Your Contact Info (Optional)</Text>

            <TextInput
              placeholder="Your Name"
              style={styles.input}
              placeholderTextColor="#777"
            />

            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#777"
            />

            {/* SUBMIT */}
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitText}>Submit Report</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    fontSize: 13,
    color: "#333",
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
