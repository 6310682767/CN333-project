import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const pathname = usePathname(); // ใช้ usePathname เพื่อดึงเส้นทางปัจจุบัน

  // ถ้าอยู่ในหน้า login ให้ซ่อน Bottom Tab
  if (pathname.startsWith("/(auth)")) {
    return <>{children}</>; // ไม่แสดง bottom tab bar สำหรับหน้า login
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "หน้าหลัก",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "แชท",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="message.fill" color={color} />
          ),
          tabBarBadge: 3, // จำนวนข้อความใหม่ที่ยังไม่ได้อ่าน
        }}
      />
      <Tabs.Screen
        name="create-post"
        options={{
          title: "สร้าง",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.square.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "แจ้งเตือน",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="bell.fill" color={color} />
          ),
          tabBarBadge: 2, // จำนวนแจ้งเตือนใหม่
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "โปรไฟล์",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
