import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function ForgotPassword() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleReset = async () => {

    if (!email) {
      Alert.alert("Error", "Enter your email.");
      return;
    }

    try {

      await sendPasswordResetEmail(
        auth,
        email.trim()
      );

      Alert.alert(
        "Success",
        "Password reset email has been sent."
      );

      router.replace("/login");

    } catch (error) {

      console.log(error);

      if (error.code === "auth/user-not-found") {

        Alert.alert(
          "Error",
          "Email not found."
        );

      } else if (
        error.code === "auth/invalid-email"
      ) {

        Alert.alert(
          "Error",
          "Invalid email."
        );

      } else {

        Alert.alert(
          "Error",
          error.message
        );

      }

    }

  };

  return (

    <ImageBackground
      source={require("../assets/images/background-bg.jpg")}
      style={styles.bg}
    >

      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >

        <Text style={styles.title}>
          Forgot Password
        </Text>

        <Text style={styles.subtitle}>
          Enter your email address.
        </Text>

        <LinearGradient
          colors={["#43a047", "#f9a825"]}
          style={styles.inputWrap}
        >

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#eee"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

        </LinearGradient>

        <TouchableOpacity
          onPress={handleReset}
        >

          <LinearGradient
            colors={["#43a047", "#f9a825"]}
            style={styles.btn}
          >

            <Text style={styles.btnText}>
              SEND RESET LINK
            </Text>

          </LinearGradient>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >

          <Text style={styles.back}>
            Back to Login
          </Text>

        </TouchableOpacity>

      </KeyboardAvoidingView>

    </ImageBackground>

  );

}

const styles = StyleSheet.create({

  bg:{
    flex:1
  },

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:20
  },

  title:{
    fontSize:28,
    fontWeight:"bold",
    color:"#2e7d32",
    marginBottom:10
  },

  subtitle:{
    color:"#444",
    marginBottom:30
  },

  inputWrap:{
    width:"100%",
    borderRadius:12,
    padding:2,
    marginBottom:20
  },

  input:{
    backgroundColor:"rgba(255,255,255,.25)",
    padding:14,
    borderRadius:10,
    color:"#fff"
  },

  btn:{
    width:250,
    padding:15,
    borderRadius:12,
    alignItems:"center"
  },

  btnText:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16
  },

  back:{
    marginTop:20,
    color:"#2e7d32",
    fontWeight:"bold"
  }

});