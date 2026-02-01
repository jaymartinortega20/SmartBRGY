// File: app/(tabs)/profile.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const [name, setName] = useState("Guest Player");
  const [email, setEmail] = useState("guest@email.com");
  const [photo, setPhoto] = useState(null);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0); // study + quests XP
  const router = useRouter();

  const loadProfile = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("currentUser");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (user) {
        if (user.name) setName(user.name);
        if (user.email) setEmail(user.email);
        if (user.profilePic) setPhoto(user.profilePic);
        if (user.level) setLevel(user.level);
        if (user.xp) setXp(user.xp);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
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
          try {
            await AsyncStorage.clear();
            router.replace("/");
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")} // 🎮 add neon gaming bg
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>⚔️ Player Profile</Text>
          <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person-circle-outline" size={70} color="#38bdf8" />
          </View>
        )}

        {/* Name & Email */}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>

        {/* Level & XP Progress */}
        <View style={styles.levelBox}>
          <Text style={styles.levelText}>Level {level} 🏆</Text>
          <View style={styles.xpBar}>
            <View style={[styles.xpFill, { width: `${Math.min(xp, 100)}%` }]} />
          </View>
          <Text style={styles.xpText}>{xp}/100 XP</Text>
        </View>

        {/* Menu Options */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/profile/edit-profile")}
        >
          <Ionicons name="create-outline" size={20} color="#FFD700" />
          <Text style={styles.menuText}> Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/change-password")}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#FF4500" />
          <Text style={styles.menuText}> Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons name="notifications-outline" size={20} color="#1E90FF" />
          <Text style={styles.menuText}> Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/help-support")}
        >
          <Ionicons name="help-circle-outline" size={20} color="#32CD32" />
          <Text style={styles.menuText}> Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/home")}
        >
          <Ionicons name="home-outline" size={20} color="#FF69B4" />
          <Text style={styles.menuText}> Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },

  header: {
    width: "100%",
    paddingVertical: 25,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    flex: 1,
    textAlign: "center",
  },
  logoutIcon: { position: "absolute", right: 20 },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "#FFD700",
  },
  placeholder: {
    backgroundColor: "rgba(20,20,20,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  email: { fontSize: 15, color: "#ccc", marginBottom: 20 },

  levelBox: {
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  levelText: { color: "#FFD700", fontSize: 18, fontWeight: "bold" },
  xpBar: {
    width: "100%",
    height: 14,
    borderRadius: 7,
    backgroundColor: "#333",
    overflow: "hidden",
    marginTop: 8,
  },
  xpFill: {
    height: "100%",
    backgroundColor: "#38bdf8",
    borderRadius: 7,
  },
  xpText: { color: "#fff", marginTop: 6, fontSize: 14 },

  menuItem: {
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  menuText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "500",
  },
});

export default Profile;
