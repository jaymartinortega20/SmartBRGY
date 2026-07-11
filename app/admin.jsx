import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  ImageBackground,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import GradientHeader from "../components/GradientHeader";
import { db } from "../firebaseConfig";

import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function Admin() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [announcements, setAnnouncements] = useState([]);
  const [reports, setReports] = useState([]);
  const [documents, setDocuments] = useState([]);

  // ==========================
  // CHECK ADMIN LOGIN
  // ==========================
  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await AsyncStorage.getItem("isAdmin");

      if (admin !== "true") {
        Alert.alert("Unauthorized", "Admin only.");
        router.replace("/adminLogin");
      }
    };

    checkAdmin();
  }, []);

  // ==========================
  // ANNOUNCEMENTS
  // ==========================
  useEffect(() => {
    const q = query(
      collection(db, "announcements"),
      orderBy("posted", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      setAnnouncements(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      );
    });
  }, []);

  // ==========================
  // INCIDENT REPORTS
  // ==========================
  useEffect(() => {
    return onSnapshot(collection(db, "reports"), (snapshot) => {
      setReports(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      );
    });
  }, []);

  // ==========================
  // DOCUMENT REQUESTS
  // ==========================
  useEffect(() => {
    return onSnapshot(collection(db, "documents"), (snapshot) => {
      setDocuments(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      );
    });
  }, []);

  // ==========================
  // POST ANNOUNCEMENT
  // ==========================
  const handlePost = async () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert(
        "Incomplete",
        "Please fill in the title and message."
      );
      return;
    }

    try {
      await addDoc(collection(db, "announcements"), {
        title,
        message,
        posted: new Date().toISOString(),
      });

      setTitle("");
      setMessage("");

      Alert.alert(
        "Success",
        "Announcement posted successfully."
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to post announcement.");
    }
  };
    // ==========================
  // DELETE ANNOUNCEMENT
  // ==========================
  const deleteAnnouncement = async (id) => {
    Alert.alert(
      "Delete Announcement",
      "Are you sure you want to delete this announcement?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "announcements", id));
              Alert.alert("Success", "Announcement deleted.");
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Unable to delete announcement.");
            }
          },
        },
      ]
    );
  };

  // ==========================
  // UPDATE REPORT STATUS
  // ==========================
  const updateReportStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "reports", id), {
        status,
      });

      Alert.alert(
        "Success",
        `Report marked as ${status}.`
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to update report.");
    }
  };

  // ==========================
  // DELETE FAKE REPORT
  // ==========================
  const deleteReport = async (id) => {
    Alert.alert(
      "Fake Report",
      "Delete this report permanently?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "reports", id));

              Alert.alert(
                "Deleted",
                "Fake report removed."
              );
            } catch (error) {
              console.log(error);
              Alert.alert(
                "Error",
                "Unable to delete report."
              );
            }
          },
        },
      ]
    );
  };

  // ==========================
  // UPDATE DOCUMENT STATUS
  // ==========================
  const updateDocumentStatus = async (
    id,
    status
  ) => {
    try {
      await updateDoc(doc(db, "documents", id), {
        status,
      });

      Alert.alert(
        "Success",
        `Document marked as ${status}.`
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Unable to update document."
      );
    }
  };

  // ==========================
  // DELETE DOCUMENT REQUEST
  // ==========================
  const deleteDocument = async (id) => {
    Alert.alert(
      "Delete Request",
      "Delete this document request?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(
                doc(db, "documents", id)
              );

              Alert.alert(
                "Deleted",
                "Request removed."
              );
            } catch (error) {
              console.log(error);
              Alert.alert(
                "Error",
                "Unable to delete request."
              );
            }
          },
        },
      ]
    );
  };

  // ==========================
  // ADMIN LOGOUT
  // ==========================
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            await AsyncStorage.removeItem("isAdmin");

            router.replace("/login");
          },
        },
      ]
    );
  };
    return (
    <ImageBackground
      source={require("../assets/images/background-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>

        {/* HEADER */}
        <View style={{ position: "relative" }}>
          <GradientHeader title="Admin Dashboard" />

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >

          {/* CREATE ANNOUNCEMENT */}

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              📢 Create Announcement
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Announcement Title"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Announcement Message"
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
              value={message}
              onChangeText={setMessage}
            />

            <TouchableOpacity
              style={styles.greenBtn}
              onPress={handlePost}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color="#fff"
              />

              <Text style={styles.greenBtnText}>
                Post Announcement
              </Text>
            </TouchableOpacity>

          </View>

          {/* INCIDENT REPORTS */}

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              🚨 Incident Reports
            </Text>

            {reports.length === 0 ? (

              <Text style={styles.emptyText}>
                No reports available.
              </Text>

            ) : (

              reports.map((item) => (

                <View
                  key={item.id}
                  style={styles.infoCard}
                >

                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.info}>
                    Incident : {item.incidentType}
                  </Text>

                  <Text style={styles.info}>
                    Location : {item.location}
                  </Text>

                  <Text style={styles.info}>
                    Phone : {item.phone}
                  </Text>

                  <Text style={styles.status}>
                    Status : {item.status || "Pending"}
                  </Text>

                  <View style={styles.rowButtons}>

                    <TouchableOpacity
                      style={styles.yellowBtn}
                      onPress={() =>
                        updateReportStatus(
                          item.id,
                          "Ongoing"
                        )
                      }
                    >
                      <Text style={styles.btnText}>
                        Ongoing
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.greenSmallBtn}
                      onPress={() =>
                        updateReportStatus(
                          item.id,
                          "Resolved"
                        )
                      }
                    >
                      <Text style={styles.btnText}>
                        Resolved
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.redBtn}
                      onPress={() =>
                        deleteReport(item.id)
                      }
                    >
                      <Text style={styles.btnText}>
                        Fake
                      </Text>
                    </TouchableOpacity>

                  </View>

                </View>

              ))

            )}

          </View>

          {/* DOCUMENT REQUESTS */}

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              📄 Document Requests
            </Text>

            {documents.length === 0 ? (

              <Text style={styles.emptyText}>
                No document requests.
              </Text>

            ) : (

              documents.map((item) => (

                <View
                  key={item.id}
                  style={styles.infoCard}
                >

                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.info}>
                    Document : {item.documentType}
                  </Text>

                  <Text style={styles.info}>
                    Purpose : {item.purpose}
                  </Text>

                  <Text style={styles.status}>
                    Status : {item.status || "Pending"}
                  </Text>

                  <View style={styles.rowButtons}>
                                        <TouchableOpacity
                      style={styles.yellowBtn}
                      onPress={() =>
                        updateDocumentStatus(
                          item.id,
                          "Noted"
                        )
                      }
                    >
                      <Text style={styles.btnText}>
                        Noted
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.greenSmallBtn}
                      onPress={() =>
                        updateDocumentStatus(
                          item.id,
                          "Ready to Claim"
                        )
                      }
                    >
                      <Text style={styles.btnText}>
                        Ready
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.redBtn}
                      onPress={() =>
                        deleteDocument(item.id)
                      }
                    >
                      <Text style={styles.btnText}>
                        Delete
                      </Text>
                    </TouchableOpacity>

                  </View>

                </View>

              ))
            )}

          </View>

          {/* ANNOUNCEMENTS */}

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              📢 Announcements
            </Text>

            {announcements.length === 0 ? (

              <Text style={styles.emptyText}>
                No announcements yet.
              </Text>

            ) : (

              announcements.map((item) => (

                <View
                  key={item.id}
                  style={styles.infoCard}
                >

                  <Text style={styles.name}>
                    {item.title}
                  </Text>

                  <Text style={styles.info}>
                    {item.message}
                  </Text>

                  <TouchableOpacity
                    style={styles.redBtn}
                    onPress={() =>
                      deleteAnnouncement(item.id)
                    }
                  >
                    <Text style={styles.btnText}>
                      Delete
                    </Text>
                  </TouchableOpacity>

                </View>

              ))

            )}

          </View>

        </ScrollView>

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
  },

  container: {
    padding: 18,
    paddingBottom: 40,
  },

  logoutBtn: {
    position: "absolute",
    right: 15,
    top: 45,
    backgroundColor: "#2e7d32",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 999,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fafafa",
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
    color: "#000",
  },

  infoCard: {
    backgroundColor: "#F7FBF7",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#2e7d32",
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 5,
  },

  info: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },

  status: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#F9A825",
  },

  rowButtons: {
    flexDirection: "row",
    marginTop: 15,
  },

  greenBtn: {
    backgroundColor: "#2e7d32",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 3,
  },

  greenBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },

  greenSmallBtn: {
    flex: 1,
    backgroundColor: "#2e7d32",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },

  yellowBtn: {
    flex: 1,
    backgroundColor: "#F9A825",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },

  redBtn: {
    flex: 1,
    backgroundColor: "#E53935",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  emptyText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    marginVertical: 15,
  },
});