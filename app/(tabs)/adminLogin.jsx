import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  SafeAreaView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const AdminLogin = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // DEFAULT ADMIN ACCOUNT
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "barangay123";

  // LOGIN FUNCTION
  const handleLogin = async () => {
    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      // SAVE ADMIN SESSION
      await AsyncStorage.setItem("isAdmin", "true");

      Alert.alert("Success", "Welcome Admin");

      // GO TO ADMIN PANEL
      router.replace("/admin");
    } else {
      Alert.alert(
        "Access Denied",
        "Wrong admin username or password"
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

        <View style={styles.overlay}>

          <View style={styles.card}>

            <Text style={styles.title}>
              BARANGAY ADMIN LOGIN
            </Text>

            <Text style={styles.subtitle}>
              Official Barangay Personnel Only
            </Text>

            {/* USERNAME */}

            <TextInput
              placeholder="Enter Username"
              placeholderTextColor="#777"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />

            {/* PASSWORD */}

            <TextInput
              placeholder="Enter Password"
              placeholderTextColor="#777"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* LOGIN BUTTON */}

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>
                Login as Admin
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  safe: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    color: "#2e7d32",
  },

  subtitle: {
    textAlign: "center",
    color: "#555",
    marginTop: 5,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    fontSize: 14,
  },

  loginBtn: {
    backgroundColor: "#2e7d32",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
});