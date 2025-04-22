import { useState } from "react";
import {
  View,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "../../components/ThemedText";
import { useAuthStore } from "../../stores/useAuthStore";

export default function SetDisplayNameScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [displayName, setDisplayName] = useState("");
  const studentID = user?.username || ""; // ใช้ studentID จาก user ที่เก็บใน store
  const [error, setError] = useState("");

  const validateDisplayName = async () => {
    if (!displayName.trim()) return "กรุณาใส่ชื่อแสดง";
    if (displayName.length > 20) return "ชื่อห้ามยาวเกิน 20 ตัวอักษร";
    return "";
  };

  const handleSubmit = async () => {
    const errorMsg = await validateDisplayName();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    // ตรวจสอบว่า displayName มีค่าแล้วหรือไม่
    if (!displayName.trim()) {
      setError("กรุณาใส่ชื่อแสดง");
      return;
    }

    // ส่งข้อมูลไปที่ backend เพื่ออัปเดตชื่อแสดง
    try {
      const response = await fetch(
        "http://192.168.1.33:5000/api/auth/set-display-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: studentID, // ส่ง userId ของผู้ใช้
            displayName: displayName,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // ถ้าอัปเดตสำเร็จ
        useAuthStore.getState().setUser({ ...user!, displayName });
        router.replace("/(tabs)/HomeScreen");
      } else {
        // ถ้ามีข้อผิดพลาดจาก server
        setError(data.error || "เกิดข้อผิดพลาดในการอัปเดตชื่อแสดง");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white px-5 pt-36">
        <ThemedText className="text-5xl leading-[70px] font-normal text-gray-800">
          ตั้งชื่อแสดง
        </ThemedText>
        <ThemedText className="text-5xl leading-[70px] font-normal text-gray-800 mb-5">
          ของคุณ
        </ThemedText>

        <View className="mb-2">
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-lg text-gray-900 bg-white shadow-sm mb-10"
            placeholder="กรอกชื่อของคุณ"
            value={displayName}
            onChangeText={(text) => {
              setDisplayName(text);
              setError("");
            }}
          />
        </View>

        {error ? (
          <ThemedText className="text-red-500 text-sm mb-4">{error}</ThemedText>
        ) : (
          <View className="mb-4" />
        )}

        <View className="flex-row justify-between space-x-5">
          <Pressable
            className="bg-red-500 rounded-full w-[33%] h-12 justify-center items-center shadow-md"
            onPress={() => router.replace("/(auth)/select-campus")}
          >
            <ThemedText className="text-white font-bold text-lg">
              ย้อนกลับ
            </ThemedText>
          </Pressable>

          <Pressable
            className={`rounded-full w-[33%] h-12 justify-center items-center shadow-md ${
              displayName ? "bg-yellow-500" : "bg-gray-300"
            }`}
            onPress={handleSubmit}
            disabled={!displayName}
          >
            <ThemedText className="text-white font-bold text-lg">
              เสร็จสิ้น
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
