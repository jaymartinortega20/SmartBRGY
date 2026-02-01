// File: app/(tabs)/study-quest.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, Stack } from "expo-router";

export default function StudyQuest() {
  const router = useRouter();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [gamingTime, setGamingTime] = useState(0);

  // Mark task complete → earn gaming minutes
  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = true;
    setTasks(updatedTasks);

    // Reward: 15 min gaming time per completed task
    setGamingTime((prev) => prev + 15);
  };

  // Add new task
  const handleAddTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { name: task, done: false }]);
    setTask("");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Study Quest 🎮📚" }} />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>📚 Study Quest</Text>
          <Text style={styles.subtitle}>
            Complete quests → Earn gaming time! 🚀
          </Text>

          {/* Input Task */}
          <TextInput
            placeholder="Enter your study quest (e.g. Math Homework)"
            value={task}
            onChangeText={setTask}
            style={styles.input}
          />

          <Pressable style={styles.button} onPress={handleAddTask}>
            <Text style={styles.buttonText}>➕ Add Quest</Text>
          </Pressable>

          {/* Quest List */}
          <View style={styles.taskList}>
            {tasks.map((t, index) => (
              <View
                key={index}
                style={[
                  styles.taskCard,
                  t.done && { backgroundColor: "#d1fae5" },
                ]}
              >
                <Text
                  style={[
                    styles.taskText,
                    t.done && { textDecorationLine: "line-through", color: "#555" },
                  ]}
                >
                  {t.name}
                </Text>

                {!t.done && (
                  <Pressable
                    style={styles.completeBtn}
                    onPress={() => handleCompleteTask(index)}
                  >
                    <Text style={styles.completeText}>✅ Complete</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>

          {/* Gaming Time Earned */}
          <View style={styles.gamingBox}>
            <Text style={styles.gamingText}>
              🎮 Gaming Time Earned: {gamingTime} min
            </Text>
          </View>

          {/* Back to Home */}
          <Pressable
            style={[styles.button, { backgroundColor: "#2d6a4f", marginTop: 20 }]}
            onPress={() => router.replace("home")}
          >
            <Text style={styles.buttonText}>⬅️ Back to Home</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0f172a", // Dark gaming bg
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#22c55e", // Green = progress
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#1e293b",
    fontSize: 16,
    color: "white",
  },
  button: {
    width: "90%",
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskList: {
    width: "100%",
    marginTop: 10,
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  taskText: {
    color: "white",
    fontSize: 16,
  },
  completeBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  completeText: {
    color: "white",
    fontWeight: "bold",
  },
  gamingBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#1e40af",
    width: "90%",
    alignItems: "center",
  },
  gamingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
