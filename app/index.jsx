
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
        {/* TOP LOGO */}
        <View style={styles.topContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* BOTTOM BUTTON */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/welcome")}
          >
            <LinearGradient
              colors={["#43a047", "#f9a825"]} // green → yellow (like pic)
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>GET STARTED</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
  },

  /* TOP */
  topContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 70,
  },

  /* BOTTOM */
  bottomContainer: {
    marginBottom: 200,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 60,
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
});
 