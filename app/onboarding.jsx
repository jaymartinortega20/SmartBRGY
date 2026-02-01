import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);

  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    router.replace("/home");
  };

  const onScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setPage(index);
  };

  return (
    <ImageBackground
      source={require("../assets/images/background-bg.jpg")}
      style={styles.bg}
    >
      <SafeAreaView style={styles.safe}>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {/* SLIDE 1 */}
          <View style={styles.slide}>
            <Image
              source={require("../assets/images/onboard1.png")}
              style={styles.image}
            />
            <Text style={styles.title}>Stay Informed</Text>
            <Text style={styles.text}>
              Get the latest updates, announcements, and alerts from your barangay.
            </Text>
          </View>

          {/* SLIDE 2 */}
          <View style={styles.slide}>
            <Image
              source={require("../assets/images/onboard2.png")}
              style={styles.image}
            />
            <Text style={styles.title}>Submit Requests</Text>
            <Text style={styles.text}>
              Report incidents, request documents, and ask for assistance easily.
            </Text>
          </View>

          {/* SLIDE 3 */}
          <View style={styles.slide}>
            <Image
              source={require("../assets/images/onboard3.png")}
              style={styles.image}
            />
            <Text style={styles.title}>Connect Instantly</Text>
            <Text style={styles.text}>
              Reach your barangay anytime for help, support, and information.
            </Text>

            {/* START BUTTON */}
            <TouchableOpacity activeOpacity={0.85} onPress={finishOnboarding}>
              <LinearGradient
                colors={["#43a047", "#f9a825"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>GET STARTED</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* DOTS */}
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[styles.dot, page === i && styles.activeDot]}
            />
          ))}
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
  },

  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  image: {
    width: width * 0.75,
    height: 240,
    resizeMode: "contain",
    marginBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1b5e20",
    textAlign: "center",
    marginBottom: 10,
  },

  text: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    lineHeight: 20,
    maxWidth: 300,
  },

  button: {
    width: 260,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#aaa",
    borderRadius: 4,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#43a047",
    width: 12,
    height: 12,
  },
});
