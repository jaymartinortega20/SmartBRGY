import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Image,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import GradientHeader from "../../components/GradientHeader";

const Profile = () => {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [photo, setPhoto] = useState(null);

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem("currentUser");

    if (data) {
      const parsed = JSON.parse(data);
      setUser(parsed);

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

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure?", [
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
      Alert.alert("Permission required");
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
      Alert.alert("Error", "Required fields missing");
      return;
    }

    const updated = {
      name,
      email,
      phone,
      address,
      birthdate,
      profilePic: photo,
    };

    await AsyncStorage.setItem("currentUser", JSON.stringify(updated));

    setUser(updated);
    setModalVisible(false);

    Alert.alert("Success", "Profile updated");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>

        <View style={{ position: "relative" }}>
          <GradientHeader title="My Profile" />

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>

            {/* CIRCLE AVATAR FIXED */}
            <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.avatar} />
              ) : (
                <View style={styles.placeholder}>
                  <Ionicons name="camera" size={32} color="#2e7d32" />
                  <Text style={styles.addText}>Tap to add photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.info}>Name: {user.name || "-"}</Text>
            <Text style={styles.info}>Email: {user.email || "-"}</Text>
            <Text style={styles.info}>Phone: {user.phone || "-"}</Text>
            <Text style={styles.info}>Address: {user.address || "-"}</Text>
            <Text style={styles.info}>Birthdate: {user.birthdate || "-"}</Text>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>

        {/* MODAL */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.overlay}>
            <View style={styles.modal}>

              <ScrollView>

                <Text style={styles.title}>Edit Profile</Text>

                <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
                <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
                <TextInput style={styles.input} placeholder="Birthdate" value={birthdate} onChangeText={setBirthdate} />

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                  <Text style={styles.saveText}>Save</Text>
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

  container: { padding: 16 },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },

  /* 🔥 FIXED CIRCLE AVATAR */
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#2e7d32",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },

  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    fontSize: 12,
    color: "#2e7d32",
    marginTop: 5,
    fontWeight: "600",
  },

  info: {
    marginTop: 8,
    fontSize: 14,
  },

  editBtn: {
    marginTop: 15,
    backgroundColor: "#2e7d32",
    padding: 12,
    borderRadius: 10,
    width: "100%",
  },

  editText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
  },

  logoutBtn: {
    position: "absolute",
    right: 15,
    top: 44,
    backgroundColor: "#2e7d32",
    padding: 10,
    borderRadius: 20,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    maxHeight: "85%",
  },

  title: {
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  saveBtn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 10,
  },

  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
  },
});