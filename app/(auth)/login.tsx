// login.tsx
import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { useAuthStore } from "../../stores/useAuthStore";
import { ThemedText } from "../../components/ThemedText";

const backgroundImage = require("../../assets/images/login-background.png");

export default function LoginScreen() {
  const [studentID, setStudentID] = useState("");
  const [citizenID, setCitizenID] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
        // บันทึกข้อมูลผู้ใช้ใน store และ AsyncStorage
        useAuthStore.getState().setUser({ studentID });
        // ไปหน้าเลือก campus
        router.replace("/(auth)/select-campus");
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ImageBackground
          source={backgroundImage}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          >
            <View className="flex-1 justify-start items-center space-y-6 pt-16 px-6">
              <Image
                source={require("../../assets/images/logo.png")}
                className="w-48 h-48"
                resizeMode="contain"
              />

              <View className="w-full space-y-4">
                <TextInput
                  className="w-full h-12 bg-white rounded-3xl px-4 text-base text-gray-700 text-center shadow-md"
                  placeholder="Student ID"
                  placeholderTextColor="gray"
                  keyboardType="number-pad"
                  value={studentID}
                  onChangeText={setStudentID}
                />
                <TextInput
                  className="w-full h-12 bg-white rounded-3xl px-4 text-base text-gray-700 text-center shadow-md"
                  placeholder="Password"
                  placeholderTextColor="gray"
                  keyboardType="number-pad"
                  textContentType="password"
                  secureTextEntry={true}
                  value={citizenID}
                  onChangeText={setCitizenID}
                />
              </View>

              <Pressable
                className={`w-4/12 h-12 rounded-3xl justify-center items-center ${
                  loading ? "bg-gray-400" : "bg-yellow-500"
                } shadow-lg`}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText className="text-white text-lg font-semibold">
                    Sign in
                  </ThemedText>
                )}
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
