import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Notifications() {
  const [enabled, setEnabled] = useState(false);

  // Load saved preference
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem("notifications_enabled");
        if (stored !== null) {
          setEnabled(stored === "true");
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };
    loadSettings();
  }, []);

  // Save toggle
  const toggleSwitch = async () => {
    try {
      const newValue = !enabled;
      setEnabled(newValue);
      await AsyncStorage.setItem("notifications_enabled", newValue.toString());
      Alert.alert("Success", newValue ? "Notifications enabled!" : "Notifications disabled!");
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch value={enabled} onValueChange={toggleSwitch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#6200ffff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#b700ffff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8d0382ff",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
