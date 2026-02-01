import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import GradientHeader from "../../components/GradientHeader";


const Announcement = () => {
  return (
  <ImageBackground
    source={require("../../assets/images/background-bg.jpg")} // ✅ FIX PATH
    style={styles.bg}
    resizeMode="cover"
  >
    <SafeAreaView style={styles.safe}>

      <GradientHeader title="Barangay Announcement" />

      <ScrollView contentContainerStyle={styles.list}>

        {/* EMERGENCY */}
        <View style={[styles.card, styles.emergencyBorder]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Water Interruption Notice</Text>
            <Text style={styles.tagEmergency}>IMPORTANT</Text>
          </View>

          <Text style={styles.cardTagEmergency}>EMERGENCY</Text>

          <Text style={styles.cardText}>
            Water supply will be interrupted tomorrow from 9:00 AM to 5:00 PM.
          </Text>

          <Text style={styles.posted}>Posted: April 23, 2026, 3:45 PM</Text>
        </View>

        {/* EVENT */}
        <View style={[styles.card, styles.eventBorder]}>
          <Text style={styles.cardTitle}>Community Clean-Up Drive</Text>
          <Text style={styles.cardTagEvent}>EVENT</Text>
          <Text style={styles.cardText}>
            Join us for a barangay clean-up this Saturday at 7:00 AM.
          </Text>
          <Text style={styles.posted}>Posted: April 22, 2026, 10:15 AM</Text>
        </View>

        {/* NOTICE */}
        <View style={[styles.card, styles.noticeBorder]}>
          <Text style={styles.cardTitle}>New Barangay ID Issuance</Text>
          <Text style={styles.cardTagNotice}>NOTICE</Text>
          <Text style={styles.cardText}>
            New barangay IDs are now available at the barangay hall.
          </Text>
          <Text style={styles.posted}>Posted: April 20, 2026, 2:30 PM</Text>
        </View>

        <Text style={styles.emptyText}>
          No announcements yet. Please comeback later.
        </Text>

      </ScrollView>
    </SafeAreaView>
  </ImageBackground>
);
};

const styles = StyleSheet.create({
 bg: {
    flex: 1,
  },
  safe: {
    flex: 1,
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  /* HEADER */
  header: {
    backgroundColor: "#8bc34a",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },

  /* LIST */
  list: {
    padding: 14,
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
  },

  /* TAGS */
  tagEmergency: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },

  cardTagEmergency: {
    color: "#d32f2f",
    fontWeight: "800",
    marginTop: 6,
    fontSize: 12,
  },
  cardTagEvent: {
    color: "#f57c00",
    fontWeight: "800",
    marginTop: 6,
    fontSize: 12,
  },
  cardTagNotice: {
    color: "#2e7d32",
    fontWeight: "800",
    marginTop: 6,
    fontSize: 12,
  },

  cardText: {
    marginTop: 6,
    fontSize: 13,
    color: "#333",
  },

  posted: {
    marginTop: 8,
    fontSize: 11,
    color: "#777",
  },

  /* BORDERS */
  emergencyBorder: {
    borderLeftWidth: 6,
    borderLeftColor: "#d32f2f",
  },
  eventBorder: {
    borderLeftWidth: 6,
    borderLeftColor: "#f57c00",
  },
  noticeBorder: {
    borderLeftWidth: 6,
    borderLeftColor: "#2e7d32",
  },

  emptyText: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    marginTop: 10,
  },
});

export default Announcement;
