import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const GradientHeader = ({ title }) => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#2e7d32", "#f9a825"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 5,
    elevation: 3,
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#fff",
  },
  logo: {
    width: 42,
    height: 42,
    padding: 4,
  },
});

export default GradientHeader;
