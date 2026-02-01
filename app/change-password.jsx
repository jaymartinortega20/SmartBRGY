// File: app/(tabs)/ChangePassword.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("⚠️ Error", "Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("⚠️ Error", "New passwords do not match.");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem("currentUser");
      if (!storedUser) {
        Alert.alert("Error", "No user found.");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.password !== oldPassword) {
        Alert.alert("Error", "Old password is incorrect.");
        return;
      }

      if (!parsedUser.id) {
        console.error("⚠️ No ID found in currentUser:", parsedUser);
        Alert.alert("Error", "User ID missing. Please re-login.");
        return;
      }

      // ✅ Update Firestore
      const userRef = doc(db, "users", parsedUser.id);
      await updateDoc(userRef, { password: newPassword });

      // ✅ Update local storage
      const updatedUser = { ...parsedUser, password: newPassword };
      await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));

      Alert.alert("✅ Success", "Password changed successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", "Failed to update password");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background-bg.jpg")} // 🎮 Add neon gaming bg
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>🔐 Change Password</Text>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#0ea5e9" />
          <TextInput
            style={styles.input}
            placeholder="Enter old password"
            placeholderTextColor="#888"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="key-outline" size={20} color="#FFD700" />
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor="#888"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#32CD32" />
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword}>
          <Text style={styles.saveText}>⚡ Update Password</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#FFD700",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderWidth: 1,
    borderColor: "#0ea5e9",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    padding: 12,
  },
  saveBtn: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
