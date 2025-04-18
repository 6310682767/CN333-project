import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useNavigation } from "expo-router";

const backgroundImage = require("../../assets/images/login-background.png"); // เปลี่ยนเป็น path ของภาพพื้นหลังที่คุณต้องการใช้

export default function LoginScreen() {
  const [studentID, setStudentID] = useState("");
  const [citizenID, setCitizenID] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // ใช้ setOptions เพื่อปิด header เฉพาะหน้า Login
    navigation.setOptions({
      headerShown: false, // ปิด header ในหน้า Login นี้
    });
  }, [navigation]);

  const handleLogin = async () => {
    if (!studentID || !citizenID) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      setLoading(true);
      // Mock login API call (จะใส่ TU API ที่จริงภายหลัง)
      await new Promise((res) => setTimeout(res, 1000));

      // ถ้า login สำเร็จ → ไปหน้า Home
      router.replace("/(tabs)");
    } catch (err) {
      Alert.alert("เข้าสู่ระบบล้มเหลว", "กรุณาตรวจสอบข้อมูลอีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background Image
    <ImageBackground
      source={backgroundImage}
      className="flex-1 justify-center px-6 py-8"
      resizeMode="cover" // ปรับให้ภาพขยายเต็มจอ
    >
      {/* Logo */}
      <View className="mb-8">
        <Text className="text-4xl font-bold text-center text-white">
          TU Talk
        </Text>
      </View>

      {/* Student ID */}
      <TextInput
        className="w-full h-12 bg-white rounded-lg px-4 mb-4 text-base text-gray-700"
        placeholder="รหัสนักศึกษา"
        placeholderTextColor="gray"
        keyboardType="number-pad"
        value={studentID}
        onChangeText={setStudentID}
      />

      {/* Citizen ID */}
      <TextInput
        className="w-full h-12 bg-white rounded-lg px-4 mb-6 text-base text-gray-700"
        placeholder="เลขบัตรประชาชน 13 หลัก"
        placeholderTextColor="gray"
        keyboardType="number-pad"
        value={citizenID}
        onChangeText={setCitizenID}
      />

      {/* ปุ่ม Login */}
      <Pressable
        className={`w-full h-12 rounded-lg justify-center items-center ${
          loading ? "bg-gray-400" : "bg-red-600"
        }`}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-semibold">เข้าสู่ระบบ</Text>
        )}
      </Pressable>
    </ImageBackground>
  );
}
