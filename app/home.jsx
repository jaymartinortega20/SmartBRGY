import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Link, useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const [photo, setPhoto] = useState(null);
  const router = useRouter();

  const loadProfilePhoto = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("currentUser");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user?.profilePic) {
        setPhoto(user.profilePic);
      } else {
        setPhoto(null);
      }
    } catch (error) {
      console.error("Error loading profile photo:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfilePhoto();
    }, [])
  );

  return (
    <ImageBackground
      source={require("../assets/images/background-bg.jpg")}
      style={styles.bg}
    >
      <SafeAreaView style={styles.safe}>

        {/* HEADER */}
        <View style={styles.headerContainer}>
         

          <View style={styles.profileRow}>
            <Text style={styles.greetText}>
              Hello Ka-Barangay, What can I do for you?
            </Text>

            <TouchableOpacity onPress={() => router.push("/profile")}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.profileImage} />
              ) : (
                <Image
                  source={require("../assets/images/logo.png")}
                  style={styles.profileImage}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>

          <HomeButton text="Report Incident" onPress={() => router.push("/report")} />
          <HomeButton text="Announcement" onPress={() => router.push("/announcement")} />
          <HomeButton text="Document Request" onPress={() => router.push("/documents")} />
          <HomeButton text="Concern / Help" onPress={() => router.push("/concern")} />

        </View>

        {/* LOGO */}
        <View style={styles.footerLogo}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

/* REUSABLE BUTTON */
const HomeButton = ({ text, onPress }) => (
  <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
    <LinearGradient
      colors={["#43a047", "#f9a825"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  safe: {
    flex: 1,
    justifyContent: "space-between",
  },

  /* HEADER */
  headerContainer: {
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  timeText: {
    fontSize: 12,
    color: "#111",
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  greetText: {
    backgroundColor: "#43a047",
    color: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 12,
    maxWidth: "75%",
  },
  profileImage: {
    width: 45,
    height: 45,
  },

  /* BUTTON AREA */
  buttonsContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    width: 260,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 18,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  /* FOOTER LOGO */
  footerLogo: {
    alignItems: "center",
    marginBottom: 40,
    marginLeft: 170,
  },
  logo: {
    width: 120,
    height: 120,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
});

export default Home;
