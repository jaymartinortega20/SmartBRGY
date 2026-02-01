
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LandingPage() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/background-bg.jpg")}
      style={styles.bg}
    >
      <SafeAreaView style={styles.safe}>
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>
          {/* LOGIN */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/login")}
          >
            <LinearGradient
              colors={["#43a047", "#f9a825"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            if you have already an account.
          </Text>

          {/* REGISTER */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/signup")}
          >
            <LinearGradient
              colors={["#43a047", "#f9a825"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, { marginTop: 18 }]}
            >
              <Text style={styles.buttonText}>REGISTER</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            if you don't have an account, click here.
          </Text>
        </View>
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
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* LOGO */
  logoContainer: {
    marginTop: 90,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 20,
  },

  /* BUTTON AREA */
  buttonsContainer: {
    marginBottom: 140,
    alignItems: "center",
  },
  button: {
    width: 260,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
  helperText: {
    marginTop: 6,
    fontSize: 12,
    color: "#444",
  },
});
