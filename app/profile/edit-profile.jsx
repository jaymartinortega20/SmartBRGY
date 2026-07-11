// File: app/profile/edit-profile.jsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import GradientHeader from "../../components/GradientHeader";

export default function EditProfile() {
  const router = useRouter();

  // Resident Information
  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // Password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("currentUser");

      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);

      setUserId(parsedUser.id);

      const userRef = doc(db, "users", parsedUser.id);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();

        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setBirthdate(data.birthdate || "");
        setAddress(data.address || "");
        setProfilePic(data.profilePic || null);
      } else {
        setName(parsedUser.name || "");
        setEmail(parsedUser.email || "");
        setPhone(parsedUser.phone || "");
        setBirthdate(parsedUser.birthdate || "");
        setAddress(parsedUser.address || "");
        setProfilePic(parsedUser.profilePic || null);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to load profile.");
    }
  };

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your gallery."
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert(
        "Missing Information",
        "Please complete all required fields."
      );
      return;
    }

    try {
      const updatedUser = {
        id: userId,
        name,
        email,
        phone,
        birthdate,
        address,
        profilePic,
      };

      if (userId) {
        const userRef = doc(db, "users", userId);

        await updateDoc(userRef, {
          name,
          email,
          phone,
          birthdate,
          address,
          profilePic,
        });
      }

      await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify(updatedUser)
      );

      Alert.alert(
        "Success",
        "Profile updated successfully!"
      );

    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Failed to update profile."
      );
    }
  };
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert(
        "Missing Fields",
        "Please complete all password fields."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Password Error",
        "New passwords do not match."
      );
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters."
      );
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
        Alert.alert(
          "Incorrect Password",
          "Current password is incorrect."
        );
        return;
      }

      const userRef = doc(db, "users", parsedUser.id);

      await updateDoc(userRef, {
        password: newPassword,
      });

      const updatedUser = {
        ...parsedUser,
        password: newPassword,
      };

      await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify(updatedUser)
      );

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      Alert.alert(
        "Success",
        "Password updated successfully!"
      );

    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Unable to update password."
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>

        <View style={{ position: "relative" }}>
          <GradientHeader title="Edit Profile" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.card}>

            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={pickImage}
            >
              {profilePic ? (
                <Image
                  source={{ uri: profilePic }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons
                    name="camera-outline"
                    size={35}
                    color="#2e7d32"
                  />
                  <Text style={styles.photoText}>
                    Change Photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.title}>
              Edit Resident Profile
            </Text>

            <Text style={styles.sectionTitle}>
              Resident Information
            </Text>
                        {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#2e7d32"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#2e7d32"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Phone */}
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#2e7d32"
              />
              <TextInput
                style={styles.input}
                placeholder="09XXXXXXXXX"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* Birthdate */}
            <Text style={styles.label}>Birthdate</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#2e7d32"
              />
              <TextInput
                style={styles.input}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#999"
                value={birthdate}
                onChangeText={setBirthdate}
              />
            </View>

            {/* Address */}
            <Text style={styles.label}>Address</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#2e7d32"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            {/* Save Profile */}
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
            >
              <Ionicons
                name="save-outline"
                size={20}
                color="#fff"
              />
              <Text style={styles.saveText}>
                Save Changes
              </Text>
            </TouchableOpacity>

            {/* ================= ACCOUNT SECURITY ================= */}

            <Text
              style={[
                styles.sectionTitle,
                { marginTop: 30 }
              ]}
            >
              Account Security
            </Text>

            {/* Current Password */}
            <Text style={styles.label}>
              Current Password
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#2e7d32"
              />

              <TextInput
                style={styles.input}
                placeholder="Current Password"
                placeholderTextColor="#999"
                secureTextEntry={!showOld}
                value={oldPassword}
                onChangeText={setOldPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowOld(!showOld)
                }
              >
                <Ionicons
                  name={
                    showOld
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#777"
                />
              </TouchableOpacity>
            </View>

            {/* New Password */}
            <Text style={styles.label}>
              New Password
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="key-outline"
                size={20}
                color="#2e7d32"
              />

              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry={!showNew}
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowNew(!showNew)
                }
              >
                <Ionicons
                  name={
                    showNew
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#777"
                />
              </TouchableOpacity>
            </View>
                        {/* Confirm Password */}
            <Text style={styles.label}>
              Confirm Password
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#2e7d32"
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                <Ionicons
                  name={
                    showConfirm
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#777"
                />
              </TouchableOpacity>
            </View>

            {/* Update Password */}
            <TouchableOpacity
              style={styles.passwordBtn}
              onPress={handleChangePassword}
            >
              <Ionicons
                name="lock-closed"
                size={20}
                color="#fff"
              />

              <Text style={styles.saveText}>
                Update Password
              </Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  safe: {
    flex: 1,
  },

  container: {
    padding: 18,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 22,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#2e7d32",
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EAF6EC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2e7d32",
  },

  photoText: {
    marginTop: 8,
    color: "#2e7d32",
    fontSize: 13,
    fontWeight: "600",
  },

  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
    marginBottom: 6,
    marginTop: 10,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FBF7",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D8E9DA",
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: "#222",
    fontSize: 15,
  },

  saveBtn: {
    marginTop: 25,
    backgroundColor: "#2e7d32",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 4,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },

  passwordBtn: {
    marginTop: 15,
    backgroundColor: "#2e7d32",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 4,
  },

  cancelBtn: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },

  cancelText: {
    color: "#d32f2f",
    fontSize: 15,
    fontWeight: "700",
  },
});