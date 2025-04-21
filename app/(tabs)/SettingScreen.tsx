// SettingsScreen.tsx
import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useAuthStore } from "../../stores/useAuthStore";
import { useRouter } from "expo-router";
import { ThemedText } from "../../components/ThemedText";

export default function SettingsScreen() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // เรียกฟังก์ชัน logout
    router.replace("/(auth)/login"); // นำทางไปหน้า login
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.header}>Settings</ThemedText>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutButtonText}>Log Out</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
  },
});
