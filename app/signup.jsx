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
import {
  collection,
  setDoc,
  doc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { db, auth } from "../firebaseConfig";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ FIXED SIGNUP FUNCTION
  const handleSignup = async () => {
  if (!email || !password || !confirm) {
    Alert.alert("Error", "Please fill all fields");
    return;
  }

  if (password !== confirm) {
    Alert.alert("Error", "Passwords do not match");
    return;
  }

  try {
    // Create account in Firebase Authentication
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

    const user = userCredential.user;

    // Send verification email
    await sendEmailVerification(user);

    // Save profile to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email.trim(),
      role: "resident",
      createdAt: new Date(),
    });

    Alert.alert(
      "Account Created",
      "A verification email has been sent to your email address."
    );

    router.replace("/login");

  } catch (error) {

    console.log(error);

    if (error.code === "auth/email-already-in-use") {
      Alert.alert("Error", "Email already exists.");
    } else if (error.code === "auth/weak-password") {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters."
      );
    } else if (error.code === "auth/invalid-email") {
      Alert.alert("Invalid Email");
    } else {
      Alert.alert("Signup Failed", error.message);
    }
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
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.appName}>SmartBRGY</Text>
          </View>

          <View style={styles.form}>
            {["email", "password", "re-type password"].map((p, i) => (
              <LinearGradient
                key={i}
                colors={["#43a047", "#f9a825"]}
                style={styles.inputWrap}
              >
                <TextInput
                  placeholder={p}
                  placeholderTextColor="#eee"
                  secureTextEntry={p !== "email" && !showPassword}
                  style={styles.input}
                  onChangeText={
                    p === "email"
                      ? setEmail
                      : p === "password"
                      ? setPassword
                      : setConfirm
                  }
                />

                {p !== "email" && i === 1 && (
                  <TouchableOpacity
                    style={styles.eye}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text>{showPassword ? "🙈" : "👁️"}</Text>
                  </TouchableOpacity>
                )}
              </LinearGradient>
            ))}

            <TouchableOpacity onPress={handleSignup}>
              <LinearGradient colors={["#43a047", "#f9a825"]} style={styles.btn}>
                <Text style={styles.btnText}>REGISTER</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text style={styles.helper}>Already have an account?</Text>
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
  eye: { position: "absolute", right: 15, top: 14 },
  btn: {
    width: 180,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  helper: { marginTop: 10, fontSize: 12, color: "#444" },
});
