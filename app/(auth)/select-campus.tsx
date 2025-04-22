import { View, Pressable, Animated } from "react-native";
import { useAuthStore } from "../../stores/useAuthStore";
import { useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { useFonts } from "expo-font";
import { ThemedText } from "../../components/ThemedText";

export default function SelectCampusScreen() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);

  const handleCampusSelection = (campus: string) => {
    setSelectedCampus(campus);
  };

  const handleNext = async () => {
    if (!selectedCampus || !user) return;

    try {
      const response = await fetch(
        "http://192.168.1.33:5000/api/auth/set-campus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username, // ใช้รหัสนักศึกษาเหมือนหน้า display-name
            campus: selectedCampus,
          }),
        }
      );

      // const data = await response.json();
      const text = await response.text();
      console.log("📦 Raw response from backend:", text);

      try {
        const data = JSON.parse(text);
        if (response.ok) {
          useAuthStore.getState().setUser({ ...user, campus: selectedCampus });
          router.replace("/(auth)/display-name");
        } else {
          console.error("❌ Server error:", data.error || "Unknown error");
        }
      } catch (err) {
        console.error(
          "❌ JSON parsing error or HTML response:",
          (err as Error).message
        );
      }
    } catch (err) {
      console.error("❌ Error in handleNext:", (err as Error).message);
    }
  };

  const [fontsLoaded] = useFonts({
    "NotoSansThai-Regular": require("../../assets/fonts/NotoSansThai-Regular.ttf"),
    "NotoSansThai-Light": require("../../assets/fonts/NotoSansThai-ExtraLight.ttf"),
    "NotoSansThai-Bold": require("../../assets/fonts/NotoSansThai-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View className="flex-1 bg-white px-5 pt-36">
      <ThemedText className="text-5xl leading-[60px] font-normal text-gray-800 mb-2">
        เลือกวิทยาเขต
      </ThemedText>
      <ThemedText className="text-5xl leading-[60px] font-normal text-gray-800 mb-8">
        ของคุณ
      </ThemedText>

      <Animated.View
        style={{ opacity: fadeAnim }}
        className="flex-row flex-wrap gap-3 mb-20"
      >
        {["รังสิต", "ท่าพระจันทร์", "ลำปาง", "พัทยา"].map((campus) => {
          const isSelected = selectedCampus === campus;
          return (
            <Pressable
              key={campus}
              className={`px-3 h-10 rounded-lg justify-center items-center ${
                isSelected ? "bg-blue-600" : "bg-gray-200"
              } shadow-md`}
              onPress={() => handleCampusSelection(campus)}
            >
              <ThemedText
                className={`text-base font-bold ${
                  isSelected ? "text-white" : "text-gray-800"
                }`}
              >
                {campus}
              </ThemedText>
            </Pressable>
          );
        })}
      </Animated.View>

      <View className="flex-row justify-between space-x-5">
        <Pressable
          className="bg-red-500 rounded-full w-[33%] h-12 justify-center items-center shadow-md"
          onPress={() => router.replace("/(auth)/login")}
        >
          <ThemedText className="text-white font-bold text-lg">
            ย้อนกลับ
          </ThemedText>
        </Pressable>

        <Pressable
          className={`rounded-full w-[33%] h-12 justify-center items-center shadow-md ${
            selectedCampus ? "bg-yellow-500" : "bg-gray-300"
          }`}
          onPress={handleNext}
          disabled={!selectedCampus}
        >
          <ThemedText className="text-white font-bold text-lg">
            ถัดไป
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
