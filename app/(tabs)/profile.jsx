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
  ImageBackground,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import GradientHeader from "../../components/GradientHeader";

const Profile = () => {
  const router = useRouter();

  const [user, setUser] = useState({});

  const loadProfile = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("currentUser");

      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);

      if (!parsedUser.id) {
        setUser(parsedUser);
        return;
      }

      const userRef = doc(db, "users", parsedUser.id);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();

        const updatedUser = {
          ...parsedUser,
          ...data,
        };

        setUser(updatedUser);

        await AsyncStorage.setItem(
          "currentUser",
          JSON.stringify(updatedUser)
        );
      } else {
        setUser(parsedUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.clear();
            router.replace("/");
          },
        },
      ]
    );
  };
    return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>

        <View style={{ position: "relative" }}>
          <GradientHeader title="Resident Profile" />

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.card}>

            <View style={styles.profileHeader}>

              <TouchableOpacity
                onPress={() => router.push("/profile/edit-profile")}
              >
                {user.profilePic ? (
                  <Image
                    source={{ uri: user.profilePic }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons
                      name="person"
                      size={45}
                      color="#2e7d32"
                    />
                  </View>
                )}
              </TouchableOpacity>

              <Text style={styles.name}>
                {user.name || "Resident Name"}
              </Text>

              <Text style={styles.subtitle}>
                Registered Resident
              </Text>

            </View>

            <View style={styles.section}>

              <Text style={styles.sectionTitle}>
                Resident Information
              </Text>

              <View style={styles.infoCard}>
                <Ionicons
                  name="person-outline"
                  size={22}
                  color="#2e7d32"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.label}>Full Name</Text>
                  <Text style={styles.value}>
                    {user.name || "-"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoCard}>
                <Ionicons
                  name="mail-outline"
                  size={22}
                  color="#2e7d32"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.label}>Email Address</Text>
                  <Text style={styles.value}>
                    {user.email || "-"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoCard}>
                <Ionicons
                  name="call-outline"
                  size={22}
                  color="#2e7d32"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.label}>Phone Number</Text>
                  <Text style={styles.value}>
                    {user.phone || "-"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoCard}>
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color="#2e7d32"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.label}>Birthdate</Text>
                  <Text style={styles.value}>
                    {user.birthdate || "-"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoCard}>
                <Ionicons
                  name="location-outline"
                  size={22}
                  color="#2e7d32"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.label}>Address</Text>
                  <Text style={styles.value}>
                    {user.address || "-"}
                  </Text>
                </View>
              </View>

            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => router.push("/profile/edit-profile")}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color="#fff"
              />
              <Text style={styles.submitText}>
                Edit Profile
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;
const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  safe: {
    flex: 1,
  },

  logoutBtn: {
    position: "absolute",
    right: 20,
    top: 25,
    backgroundColor: "#2e7d32",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginTop: 20,
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

  profileHeader: {
    alignItems: "center",
    marginBottom: 25,
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

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e7d32",
    marginTop: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  section: {
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 15,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FBF7",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#2e7d32",
    elevation: 2,
  },

  infoContent: {
    marginLeft: 12,
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
    fontWeight: "600",
  },

  value: {
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
  },

  submitBtn: {
    marginTop: 20,
    backgroundColor: "#2e7d32",
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 4,
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});