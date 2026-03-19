import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  ImageBackground,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import GradientHeader from "../../components/GradientHeader";

const Profile = () => {
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // editable states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [photo, setPhoto] = useState(null);

  const router = useRouter();

  const loadProfile = async () => {
    const storedUser = await AsyncStorage.getItem("currentUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      // preload edit fields
      setName(parsed.name || "");
      setEmail(parsed.email || "");
      setPhone(parsed.phone || "");
      setAddress(parsed.address || "");
      setBirthdate(parsed.birthdate || "");
      setPhoto(parsed.profilePic || null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.clear();
          router.replace("/");
        },
      },
    ]);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission needed", "Allow access to gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Missing Fields", "Please fill required fields");
      return;
    }

    const updatedUser = {
      name,
      email,
      phone,
      address,
      birthdate,
      profilePic: photo,
    };

    await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setModalVisible(false);
    Alert.alert("Success", "Profile updated!");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>

        {/* HEADER */}
        <View style={{ position: "relative" }}>
          <GradientHeader title="My Profile" />
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
              {user.profilePic ? (
                <Image source={{ uri: user.profilePic }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="camera" size={30} color="#666" />
                  <Text style={styles.addPhotoText}>Add Photo</Text>
                </View>
              )}
            </View>

            {/* Info */}
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#2e7d32" />
              <Text style={styles.infoText}>{user.name || "No name"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={20} color="#2e7d32" />
              <Text style={styles.infoText}>{user.birthdate || "No birthdate"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="call" size={20} color="#2e7d32" />
              <Text style={styles.infoText}>{user.phone || "No phone"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} color="#2e7d32" />
              <Text style={styles.infoText}>{user.email || "No email"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#2e7d32" />
              <Text style={styles.infoText}>{user.address || "No address"}</Text>
            </View>

            {/* Edit Button */}
            <TouchableOpacity style={styles.submitBtn} onPress={() => setModalVisible(true)}>
              <Text style={styles.submitText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* FLOATING MODAL */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>

              <ScrollView>
                <Text style={styles.modalTitle}>Edit Profile</Text>

                <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                  {photo ? (
                    <Image source={{ uri: photo }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={{ fontSize: 12 }}>Add Photo</Text>
                    </View>
                  )}
                </TouchableOpacity>

                <Text style={styles.label}>Full Name *</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />

                <Text style={styles.label}>Email *</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />

                <Text style={styles.label}>Phone *</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

                <Text style={styles.label}>Birthdate</Text>
                <TextInput style={styles.input} value={birthdate} onChangeText={setBirthdate} />

                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} value={address} onChangeText={setAddress} />

                <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
                  <Text style={styles.submitText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ textAlign: "center", marginTop: 10 }}>Cancel</Text>
                </TouchableOpacity>
              </ScrollView>

            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  logoutBtn: {
    position: "absolute",
    right: 19,
    top: 25,
    backgroundColor: "#2e7d32",
    padding: 8,
    borderRadius: 20,
    marginTop: 20,
  },

  container: { padding: 16 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 30,
    elevation: 10,
    alignItems: "center",
  },

  avatarContainer: { marginBottom: 15 },

  avatar: { width: 100, height: 100, borderRadius: 50 },

  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#09ff00ff",
    justifyContent: "center",
    alignItems: "center",
  },

  addPhotoText: { fontSize: 12, marginTop: 5, color: "#000000ff" },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 6,
    gap: 10,
  },

  infoText: { fontSize: 14, color: "#333" },

  submitBtn: {
    marginTop: 20,
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },

  submitText: { color: "#fff", fontWeight: "800", fontSize: 15 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    maxHeight: "85%",
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
  },

  label: {
    fontWeight: "700",
    fontSize: 13,
    marginTop: 12,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#8a8a8aff",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fafafa",
    fontSize: 14,
  },
});