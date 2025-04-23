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
import axios from "axios";

const backgroundImage = require("../../assets/images/login-background.png");

export default function LoginScreen() {
  const [studentID, setStudentID] = useState("");
  const [citizenID, setCitizenID] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    useAuthStore.getState().loadUserFromStorage();
  }, [navigation]);

  const handleLogin = async () => {
    if (!studentID || !citizenID) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http:192.168.1.33:5000/api/auth/login", {
        username: studentID,
        password: citizenID,
      });

      const user = res.data.user;
      useAuthStore.getState().setUser(user); // เก็บ user ไว้ใน store

      if (!user.displayName || !user.campus) {
        router.replace("/(auth)/select-campus");
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (err: any) {
      console.error("Login failed:", err.message);
      Alert.alert(
        "เข้าสู่ระบบล้มเหลว",
        err.response?.data?.error || "กรุณาลองใหม่"
      );
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
            <View className="flex-1 justify-start items-center space-y-6 pt-36 px-6">
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
