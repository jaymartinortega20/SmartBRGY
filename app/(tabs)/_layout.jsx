import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2e7d32",
      }}
    >

      {/* ANNOUNCEMENTS */}

      <Tabs.Screen
        name="announcement"
        options={{
          title: "Announcements",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="megaphone"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* REPORT */}

      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="alert-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* FEEDBACK */}

      <Tabs.Screen
        name="feedback"
        options={{
          title: "Concern",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* PROFILE */}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* DOCUMENTS */}

      <Tabs.Screen
        name="documents"
        options={{
          title: "Documents",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="document-text"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* HIDE ADMIN PAGES */}

      <Tabs.Screen
        name="admin"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="adminLogin"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );
}