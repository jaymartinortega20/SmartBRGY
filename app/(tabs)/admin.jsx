import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const Admin = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [announcements, setAnnouncements] = useState([]);
  const [reports, setReports] = useState([]);
  const [documents, setDocuments] = useState([]);

  // 🔐 CHECK ADMIN
  useEffect(() => {
    const check = async () => {
      const isAdmin = await AsyncStorage.getItem("isAdmin");
      if (isAdmin !== "true") {
        Alert.alert("Unauthorized", "Admin only");
        router.replace("/adminLogin");
      }
    };
    check();
  }, []);

  // 🔥 ANNOUNCEMENTS REALTIME
  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("posted", "desc"));

    return onSnapshot(q, (snap) => {
      setAnnouncements(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  // 🔥 REPORTS REALTIME
  useEffect(() => {
    return onSnapshot(collection(db, "reports"), (snap) => {
      setReports(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  // 🔥 DOCUMENTS REALTIME
  useEffect(() => {
    return onSnapshot(collection(db, "documents"), (snap) => {
      setDocuments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  // ➕ POST ANNOUNCEMENT
  const handlePost = async () => {
    if (!title || !message) {
      return Alert.alert("Error", "Fill all fields");
    }

    await addDoc(collection(db, "announcements"), {
      title,
      message,
      posted: new Date().toISOString(),
    });

    setTitle("");
    setMessage("");

    Alert.alert("Success", "Announcement Posted");
  };

  // 🗑 DELETE ANNOUNCEMENT
  const deleteAnnouncement = async (id) => {
    await deleteDoc(doc(db, "announcements", id));
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>ADMIN PANEL</Text>

      {/* 🔵 CREATE ANNOUNCEMENT */}
      <View style={styles.card}>
        <Text style={styles.section}>Create Announcement</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.btn} onPress={handlePost}>
          <Text style={styles.btnText}>POST</Text>
        </TouchableOpacity>
      </View>

      {/* 📢 ANNOUNCEMENTS */}
      <Text style={styles.section}>ANNOUNCEMENTS</Text>

      {announcements.map((a) => (
        <View key={a.id} style={styles.card}>
          <Text style={styles.bold}>{a.title}</Text>
          <Text>{a.message}</Text>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => deleteAnnouncement(a.id)}
          >
            <Text style={styles.btnText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* 🚨 REPORTS */}
      <Text style={styles.section}>REPORTS</Text>

      {reports.map((r) => (
        <View key={r.id} style={styles.card}>
          <Text style={styles.bold}>Name: {r.name}</Text>
          <Text>Phone: {r.phone}</Text>
          <Text>Location: {r.location}</Text>
          <Text>Type: {r.incidentType}</Text>
          <Text>Status: {r.status}</Text>
        </View>
      ))}

      {/* 📄 DOCUMENTS */}
      <Text style={styles.section}>DOCUMENT REQUESTS</Text>

      {documents.map((d) => (
        <View key={d.id} style={styles.card}>
          <Text style={styles.bold}>{d.documentType}</Text>
          <Text>Name: {d.name}</Text>
          <Text>Purpose: {d.purpose}</Text>
          <Text>Status: {d.status}</Text>
        </View>
      ))}

    </ScrollView>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20,
  },

  section: {
    fontWeight: "900",
    marginVertical: 10,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "#000",
  },

  btn: {
    backgroundColor: "#2e7d32",
    padding: 12,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
  },

  deleteBtn: {
    backgroundColor: "#d32f2f",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  bold: {
    fontWeight: "800",
  },
});