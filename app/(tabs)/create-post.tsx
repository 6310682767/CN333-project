// create-post.tsx
import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av";
import { useRouter } from "expo-router";
import useCreatePostStore from "../../stores/useCreatePostStore";
import useFeedStore from "../../stores/useFeedStore";
import { useAuthStore } from "../../stores/useAuthStore";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export default function CreatePostScreen() {
  const {
    community,
    target,
    content,
    images,
    videos,
    setCommunity,
    setTarget,
    setContent,
    setImages,
    setVideos,
    reset,
  } = useCreatePostStore();

  const addPost = useFeedStore((state) => state.addPost);
  const { user } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert("กรุณากรอกเนื้อหาโพสต์");
      return;
    }

    if (community === "เลือกห้องคอมมูนิตี้") {
      Alert.alert("กรุณาเลือกห้องคอมมูนิตี้ก่อนโพสต์");
      return;
    }

    if (target === "เลือกกลุ่มเป้าหมาย") {
      Alert.alert("กรุณาเลือกกลุ่มเป้าหมายก่อนโพสต์");
      return;
    }

    if (!user?.displayName) {
      Alert.alert("คุณต้องเข้าสู่ระบบก่อนโพสต์");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("content", content);
      formData.append("community", community);
      formData.append("target", target);
      formData.append("authorName", user.displayName);

      // อัปโหลดรูปภาพ
      const imageURLs = [];
      for (let i = 0; i < images.length; i++) {
        const filename = images[i].split("/").pop();
        const storageRef = ref(storage, `images/${filename}`);
        const response = await fetch(images[i]);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        imageURLs.push(downloadURL);
      }

      // อัปโหลดวิดีโอ
      const videoURLs = [];
      for (let i = 0; i < videos.length; i++) {
        const filename = videos[i].split("/").pop();
        const storageRef = ref(storage, `videos/${filename}`);
        const response = await fetch(videos[i]);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        videoURLs.push(downloadURL);
      }

      // สร้างโพสต์
      const response = await axios.post(
        "http://192.168.1.33:5000/api/posts/create",
        {
          content,
          community,
          target,
          authorName: user.displayName,
          images: imageURLs,
          videos: videoURLs,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("โพสต์สำเร็จ:", response.data);

      Alert.alert("โพสต์สำเร็จ!");
      reset();
      router.push("/home");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการโพสต์:", error);
      Alert.alert("เกิดข้อผิดพลาดในการโพสต์");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 0, backgroundColor: "#eab308" }}>
        <View className="bg-yellow-500 px-4 pt-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.push("/home")}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>

          <ThemedText
            className="text-white text-2xl text-center flex-1"
            type="title"
          >
            สร้างโพสต์
          </ThemedText>

          <TouchableOpacity onPress={handleSubmit}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => router.push("/(modals)/select-community")}
          className="flex-row items-center p-3 border border-gray-300 bg-gray-200 rounded-full mb-2"
        >
          <Ionicons name="globe-outline" size={18} color="gray" />
          <ThemedText className="ml-2 text-gray-600">{community}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(modals)/select-target")}
          className="flex-row items-center p-3 border border-gray-300 bg-gray-200 rounded-full mb-4"
        >
          <Ionicons name="eye-outline" size={18} color="gray" />
          <ThemedText className="ml-2 text-gray-600">{target}</ThemedText>
        </TouchableOpacity>

        <TextInput
          placeholder="คุณคิดอะไรอยู่ ?"
          placeholderTextColor="gray"
          multiline
          value={content}
          onChangeText={setContent}
          className="text-base min-h-[120px] text-black border border-gray-300 rounded-xl p-4"
        />

        {/* เลือกรูปภาพ */}
        <View className="flex-row space-x-4 mt-4">
          <TouchableOpacity
            onPress={async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                quality: 1,
              });
              if (!result.canceled) {
                setImages([
                  ...images,
                  ...result.assets.map((asset) => asset.uri),
                ]);
              }
            }}
          >
            <Ionicons name="image-outline" size={28} color="#4B5563" />
          </TouchableOpacity>

          {/* เลือกวิดีโอ */}
          <TouchableOpacity
            onPress={async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsMultipleSelection: true,
                quality: 1,
              });
              if (!result.canceled) {
                setVideos([
                  ...videos,
                  ...result.assets.map((asset) => asset.uri),
                ]);
              }
            }}
          >
            <Ionicons name="videocam-outline" size={28} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* แสดงรูปภาพ */}
        <View className="flex-row flex-wrap mt-4">
          {images.map((uri, index) => (
            <View key={index} className="relative mr-2 mb-2">
              <Image source={{ uri }} className="w-24 h-24 rounded-lg" />
              <TouchableOpacity
                className="absolute top-0 right-0 bg-black/60 rounded-full p-1"
                onPress={() => {
                  const newImages = [...images];
                  newImages.splice(index, 1);
                  setImages(newImages);
                }}
              >
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* แสดงวิดีโอ */}
        <View className="flex-row flex-wrap mt-2">
          {videos.map((uri, index) => (
            <View key={`video-${index}`} className="relative mr-2 mb-2">
              <Video
                source={{ uri }}
                style={{ width: 96, height: 96, borderRadius: 8 }}
                resizeMode={ResizeMode.COVER}
                useNativeControls={false}
                isMuted
                shouldPlay={false}
              />
              <TouchableOpacity
                className="absolute top-0 right-0 bg-black/60 rounded-full p-1"
                onPress={() => {
                  const newVideos = [...videos];
                  newVideos.splice(index, 1);
                  setVideos(newVideos);
                }}
              >
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
