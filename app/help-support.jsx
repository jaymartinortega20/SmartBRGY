import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HelpSupport() {
  // Open email app
  const handleEmail = () => {
    Linking.openURL("mailto:support@studyquest.com").catch(() =>
      Alert.alert("Error", "Could not open email client")
    );
  };

  // Open phone dialer
  const handleCall = () => {
    Linking.openURL("tel:+639123456789").catch(() =>
      Alert.alert("Error", "Could not open dialer")
    );
  };

  // Open FAQ webpage
  const handleFAQ = () => {
    Linking.openURL("https://yourapp.com/faq").catch(() =>
      Alert.alert("Error", "Could not open FAQ page")
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/background-bg.jpg")} // 🎮📚 neon bg
      style={styles.bg}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>⚡ Help & Support</Text>
        <Text style={styles.subtitle}>
          We're here to guide your quest anytime 🚀
        </Text>

        <TouchableOpacity style={styles.card} onPress={handleEmail} activeOpacity={0.9}>
          <Ionicons name="mail-outline" size={28} color="#00f7ff" />
          <Text style={styles.text}>📧 Email Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleCall} activeOpacity={0.9}>
          <Ionicons name="call-outline" size={28} color="#ff007f" />
          <Text style={styles.text}>📞 Call Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleFAQ} activeOpacity={0.9}>
          <Ionicons name="help-circle-outline" size={28} color="#ffd700" />
          <Text style={styles.text}>❓ Visit FAQ</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, resizeMode: "cover" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 15, 35, 0.85)", // dark overlay
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
    color: "#00f7ff", // neon blue
    textShadowColor: "#0ff",
    textShadowRadius: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#ffd700", // gold
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)", // semi-transparent neon panel
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#00f7ff",
    shadowColor: "#00f7ff",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
    fontWeight: "700",
    color: "#fff",
  },
});
