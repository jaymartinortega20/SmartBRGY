import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Animated,
  Pressable,
} from "react-native";

import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import GradientHeader from "../../components/GradientHeader";

const Announcement = () => {
  const [selected, setSelected] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  const scaleAnim = useRef(new Animated.Value(0)).current;

  // 🔥 REAL-TIME FIREBASE LISTENER
  useEffect(() => {
    const q = query(
      collection(db, "announcements"),
      orderBy("posted", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAnnouncements(data);
    });

    return () => unsub();
  }, []);

  // OPEN MODAL
  const openModal = (item) => {
    setSelected(item);

    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // CLOSE MODAL
  const closeModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSelected(null));
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <GradientHeader title="Barangay Announcement" />

        <ScrollView contentContainerStyle={styles.list}>

          {announcements.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                No announcements yet
              </Text>
            </View>
          ) : (
            announcements.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => openModal(item)}
              >
                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <Text style={styles.cardType}>
                  {item.type}
                </Text>

                <Text numberOfLines={2} style={styles.cardText}>
                  {item.message}
                </Text>
              </TouchableOpacity>
            ))
          )}

        </ScrollView>
      </SafeAreaView>

      {/* MODAL */}
      <Modal transparent visible={!!selected} animationType="fade">
        <Pressable style={styles.overlay} onPress={closeModal}>
          <Animated.View
            style={[
              styles.modalCard,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            {selected && (
              <>
                <Text style={styles.modalTitle}>
                  {selected.title}
                </Text>

                <Text style={styles.modalType}>
                  {selected.type}
                </Text>

                <Text style={styles.modalText}>
                  {selected.message}
                </Text>

                <Text style={styles.posted}>
                  Posted: {selected.posted}
                </Text>
              </>
            )}
          </Animated.View>
        </Pressable>
      </Modal>
    </ImageBackground>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  list: {
    padding: 16,
  },

  emptyBox: {
    backgroundColor: "#ffffffcc",
    padding: 20,
    borderRadius: 14,
    alignItems: "center",
  },

  emptyText: {
    color: "#555",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  cardTitle: {
    fontWeight: "800",
    fontSize: 15,
  },

  cardType: {
    color: "#2e7d32",
    fontWeight: "700",
    marginTop: 4,
  },

  cardText: {
    marginTop: 6,
    color: "#333",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  modalType: {
    fontWeight: "700",
    marginTop: 6,
    color: "#2e7d32",
  },

  modalText: {
    marginTop: 12,
    fontSize: 15,
  },

  posted: {
    marginTop: 12,
    fontSize: 12,
    color: "#777",
  },
});