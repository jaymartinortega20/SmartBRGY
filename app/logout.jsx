// File: app/Logout.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "⚠️ Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              // clear storage
              await AsyncStorage.clear();

              // redirect to Login page
              router.replace("/login");
            } catch (error) {
              console.error("Logout error:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/gaming-study.png")} // 🎮📚 neon background
      style={styles.bg}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>🎮 StudyQuest</Text>
        <Text style={styles.subtitle}>Ready to take a break? 📚</Text>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.9}
        >
          <Text style={styles.logoutText}>🚪 Log Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 15, 35, 0.85)", // dark neon overlay
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#00f7ff", // neon cyan
    marginBottom: 8,
    textShadowColor: "#0ff",
    textShadowRadius: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffd700", // neon gold
    marginBottom: 40,
    textAlign: "center",
  },
  logoutBtn: {
    backgroundColor: "#ff007f", // neon pink
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 14,
    shadowColor: "#00f7ff",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
