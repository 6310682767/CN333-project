import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
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

      const response = await fetch(
        "https://restapi.tu.ac.th/api/v1/auth/Ad/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Application-Key":
              "TUc92ac9800ebb78fa4e7a8b0adbed88c29121fb7988c0a29ae3d5c6026e27fa6c510d2d6a5eceeee7fb64f2f478b94015",
          },
          body: JSON.stringify({
            UserName: studentID,
            PassWord: citizenID,
          }),
        }
      );

      const data = await response.json();

      if (data.status === true) {
        // ล็อกอินสำเร็จ
        router.replace("/(tabs)/HomeScreen");
      } else {
        Alert.alert(
          "เข้าสู่ระบบล้มเหลว",
          data.message || "กรุณาตรวจสอบข้อมูลอีกครั้ง"
        );
      }
    } catch (err) {
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ปิด Keyboard เมื่อแตะที่พื้นหลัง
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Background Image */}
      <ImageBackground
        source={backgroundImage}
        className="flex-1 justify-start px-6 py-8" // Changed justify-center to justify-start
        resizeMode="cover" // ปรับให้ภาพขยายเต็มจอ
      >
        {/* Bright Overlay */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject, // Fills the entire screen
            backgroundColor: "white",
            opacity: 0.1, // Adjust transparency to brighten the background
          }}
        />

        {/* Logo */}
        <View className="justify-center items-center mb-6 mt-12">
          {/* Adjusted margins */}
          <Image
            source={require("../../assets/images/logo.png")}
            className="w-40 h-40" // Slightly smaller logo
            resizeMode="contain"
          />
        </View>

        {/* Input Fields */}
        <View className="space-y-4">
          {/* Student ID */}
          <TextInput
            className="w-full h-12 bg-white rounded-3xl px-4 text-base text-gray-700 text-center shadow-md"
            placeholder="Student ID"
            placeholderTextColor="gray"
            keyboardType="number-pad"
            value={studentID}
            onChangeText={setStudentID}
          />

          {/* Citizen ID */}
          <TextInput
            className="w-full h-12 bg-white rounded-3xl px-4 text-base text-gray-700 text-center shadow-md"
            placeholder="Password"
            placeholderTextColor="gray"
            keyboardType="default"
            secureTextEntry={true} // ใช้ secureTextEntry เพื่อซ่อนรหัสผ่าน
            value={citizenID}
            onChangeText={setCitizenID}
          />
        </View>

        {/* Login Button */}
        <Pressable
          className={`w-full h-12 mt-6 rounded-3xl justify-center items-center ${
            loading ? "bg-gray-400" : "bg-yellow-500"
          } shadow-lg`}
          onPress={handleLogin}
          disabled={loading}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-semibold">Sign in</Text>
          )}
        </Pressable>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
