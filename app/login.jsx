import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ FIXED LOGIN FUNCTION
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      // 🔥 Firebase query (email + password)
      const q = query(
        collection(db, "users"),
        where("email", "==", email.trim()),
        where("password", "==", password.trim())
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Alert.alert("Login Failed", "Invalid email or password");
        return;
      }

      // ✅ Get user data
      const docSnap = snapshot.docs[0];
      const userData = { id: docSnap.id, ...docSnap.data() };

      // ✅ Save to AsyncStorage
      await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify(userData)
      );

      // ✅ Redirect
      router.replace("/onboarding");

    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Error", "Login failed");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background-bg.jpg")}
      style={styles.bg}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          {/* LOGO */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>SmartBRGY</Text>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            <LinearGradient colors={["#43a047", "#f9a825"]} style={styles.inputWrap}>
              <TextInput
                placeholder="email"
                placeholderTextColor="#eee"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </LinearGradient>

            <LinearGradient colors={["#43a047", "#f9a825"]} style={styles.inputWrap}>
              <TextInput
                placeholder="password"
                placeholderTextColor="#eee"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eye}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text>{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity onPress={handleLogin}>
              <LinearGradient colors={["#43a047", "#f9a825"]} style={styles.btn}>
                <Text style={styles.btnText}>LOGIN</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.helper}>Don’t have an account?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  logoContainer: { marginTop: 70, alignItems: "center" },
  logo: { width: 220, height: 220 },
  appName: { fontSize: 26, fontWeight: "800", color: "#2e7d32" },

  form: { marginTop: 30, alignItems: "center" },
  inputWrap: {
    width: 260,
    borderRadius: 10,
    marginBottom: 18,
    padding: 2,
    position: "relative",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#fff",
  },
  eye: {
    position: "absolute",
    right: 15,
    top: 14,
  },
  btn: {
    width: 180,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  helper: { marginTop: 10, fontSize: 12, color: "#444" },
});
