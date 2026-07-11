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

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Please fill all fields");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );

    const user = userCredential.user;

// Refresh verification status
await user.reload();

// Get user profile from Firestore
const docSnap = await getDoc(doc(db, "users", user.uid));

if (!docSnap.exists()) {
  Alert.alert("Error", "User profile not found.");
  await auth.signOut();
  return;
}

const userData = {
  id: user.uid,
  ...docSnap.data(),
};

// Residents only kinahanglan verified
if (
  userData.role !== "admin" &&
  !user.emailVerified
) {
  Alert.alert(
    "Email Not Verified",
    "Please verify your email first. Check your inbox."
  );

  await auth.signOut();
  return;
}

// Save session
await AsyncStorage.setItem(
  "currentUser",
  JSON.stringify(userData)
);

// Redirect by role
if (userData.role === "admin") {

  await AsyncStorage.setItem("isAdmin", "true");

  router.replace("/admin");

} else {

  await AsyncStorage.setItem("isAdmin", "false");

  router.replace("/onboarding");

}

  } catch (error) {

    console.log(error);

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      Alert.alert("Login Failed", "Invalid email or password.");
    } else {
      Alert.alert("Error", error.message);
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
              resizeMode="contain"
            />

            <Text style={styles.appName}>SmartBRGY</Text>
          </View>

          <View style={styles.form}>
            <LinearGradient
              colors={["#43a047", "#f9a825"]}
              style={styles.inputWrap}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#eee"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </LinearGradient>

            <LinearGradient
              colors={["#43a047", "#f9a825"]}
              style={styles.inputWrap}
            >
              <TextInput
                placeholder="Password"
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
            <TouchableOpacity
  onPress={() => router.push("/forgotPassword")}
>
  <Text
    style={{
      color:"#2e7d32",
      alignSelf:"flex-end",
      marginBottom:15,
      fontWeight:"600"
    }}
  >
    Forgot Password?
  </Text>
</TouchableOpacity>

            <TouchableOpacity onPress={handleLogin}>
              <LinearGradient
                colors={["#43a047", "#f9a825"]}
                style={styles.btn}
              >
                <Text style={styles.btnText}>LOGIN</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.helper}>
                Don't have an account?
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  logoContainer: {
    marginTop: 70,
    alignItems: "center",
  },

  logo: {
    width: 220,
    height: 220,
  },

  appName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2e7d32",
  },

  form: {
    marginTop: 30,
    alignItems: "center",
  },

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

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  helper: {
    marginTop: 10,
    fontSize: 12,
    color: "#444",
  },
});