import { useState } from "react";
import {
  View,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "../../components/ThemedText";
import { useAuthStore } from "../../stores/useAuthStore";

const BAD_WORDS = ["fuck", "shit", "bitch", "asshole", "bastard"];
// ห้ามใช้ตัวอักษรพิเศษหรืออีโมจิ
const SPECIAL_CHAR_REGEX = /[^\w\s\u0E00-\u0E7F]/;
// ห้ามใช้ภาษาไทย
const THAI_CHAR_REGEX = /[\u0E00-\u0E7F]/;

export default function SetDisplayNameScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const validateDisplayName = async () => {
    if (!displayName.trim()) return "กรุณาใส่ชื่อแสดง";
    if (THAI_CHAR_REGEX.test(displayName)) return "ห้ามใช้ภาษาไทยในชื่อแสดง";
    if (displayName.length > 20) return "ชื่อห้ามยาวเกิน 20 ตัวอักษร";
    if (BAD_WORDS.some((word) => displayName.includes(word)))
      return "ชื่อมีคำไม่สุภาพ";
    if (SPECIAL_CHAR_REGEX.test(displayName))
      return "ห้ามใช้อักขระพิเศษหรืออีโมจิ";

    // Mock ตรวจชื่อซ้ำ
    const existingNames = ["ต้น", "ใบเฟิร์น", "admin"];
    if (existingNames.includes(displayName)) return "ชื่อผู้ใช้นี้ถูกใช้แล้ว";

    return "";
  };

  const handleSubmit = async () => {
    const errorMsg = await validateDisplayName();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    useAuthStore.getState().setUser({ ...user!, displayName });
    router.replace("/(tabs)/HomeScreen");
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
