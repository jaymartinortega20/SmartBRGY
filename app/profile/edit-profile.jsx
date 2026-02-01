// File: app/profile/edit-profile.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter, Stack } from "expo-router";
import { db } from "../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [userId, setUserId] = useState(null);

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("currentUser");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserId(parsedUser.id);
          setEmail(parsedUser.email);

          const userRef = doc(db, "users", parsedUser.id);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const data = snap.data();
            setName(data.name || "");
            setProfilePic(data.profilePic || null);
          } else {
            setName(parsedUser.name || "");
            setProfilePic(parsedUser.profilePic || null);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);

  // Pick new profile picture
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // Save profile
  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert("⚠️ Error", "Please fill out all fields.");
      return;
    }

    try {
      if (userId) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          name,
          email,
          profilePic: profilePic || null,
        });

        // ✅ Update AsyncStorage
        const updatedUser = { id: userId, name, email, profilePic };
        await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }

      Alert.alert("✅ Success", "Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")} // 🎮 background
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Edit Profile" }} />

        <Text style={styles.title}>🎮 Edit Profile</Text>

        {/* Profile Picture */}
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="camera-outline" size={28} color="#888" />
              <Text style={{ color: "#888", marginTop: 5 }}>Choose Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#FFD700" />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#0ea5e9" />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>⚡ Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 25,
    textAlign: "center",
    color: "#FFD700",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  imageContainer: { alignSelf: "center", marginBottom: 20 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#0ea5e9",
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0ea5e9",
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
