// File: app/(tabs)/Shop.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Shop() {
  const router = useRouter();
  const [xp, setXp] = useState(250); // Example: you can connect this to your XP system later

  // Example rewards
  const rewards = [
    { id: "1", title: "🎮 1 Hour Gaming Time", cost: 100 },
    { id: "2", title: "⚡ XP Boost +50", cost: 150 },
    { id: "3", title: "🍫 Study Snack Reward", cost: 200 },
    { id: "4", title: "🎧 30 Min Music Break", cost: 80 },
    { id: "5", title: "🛡️ Unlock Special Avatar", cost: 300 },
  ];

  const handleRedeem = (reward) => {
    if (xp >= reward.cost) {
      setXp(xp - reward.cost);
      Alert.alert("✅ Redeemed", `You unlocked: ${reward.title}`);
    } else {
      Alert.alert("❌ Not Enough XP", "Keep studying to earn more XP!");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")} // 🎮 Shop background
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Ionicons name="cart" size={50} color="#FFD700" />
          <Text style={styles.header}>🏪 Study Quest Shop</Text>
          <Text style={styles.subHeader}>
            Redeem your XP for gaming time & cool rewards
          </Text>
          <Text style={styles.xpText}>⭐ Current XP: {xp}</Text>
        </View>

        {/* Rewards */}
        <View style={styles.shopList}>
          {rewards.map((reward) => (
            <View key={reward.id} style={styles.card}>
              <Text style={styles.cardTitle}>{reward.title}</Text>
              <Text style={styles.cardCost}>Cost: {reward.cost} XP</Text>
              <Pressable
                style={styles.redeemButton}
                onPress={() => handleRedeem(reward)}
              >
                <Text style={styles.redeemText}>Redeem</Text>
              </Pressable>
            </View>
          ))}
        </View>

        {/* Back Button */}
        <Pressable
          style={styles.homeButton}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.homeButtonText}>⬅️ Back to Home Base</Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subHeader: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  xpText: {
    marginTop: 10,
    fontSize: 16,
    color: "#00FF7F",
    fontWeight: "bold",
  },
  shopList: {
    gap: 15,
  },
  card: {
    padding: 15,
    backgroundColor: "rgba(50,50,50,0.85)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  cardCost: {
    fontSize: 14,
    color: "#FFD700",
    marginBottom: 8,
  },
  redeemButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  redeemText: {
    color: "#fff",
    fontWeight: "bold",
  },
  homeButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#8A2BE2",
    alignItems: "center",
  },
  homeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
