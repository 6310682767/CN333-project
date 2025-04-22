import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostImagePicker from "../../components/PostImagePicker";
import { useRouter } from "expo-router";
import useCreatePostStore from "../../stores/useCreatePostStore";
import useFeedStore from "../../stores/useFeedStore";
import { useAuthStore } from "../../stores/useAuthStore";

export default function CreatePostScreen() {
    const {
        community,
        target,
        content,
        images,
        setCommunity,
        setTarget,
        setContent,
        setImages,
        reset,
    } = useCreatePostStore();

    const addPost = useFeedStore((state) => state.addPost);
    const { user } = useAuthStore();
    const router = useRouter();

    const handleSubmit = () => {
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

        addPost({ content, community, target, images, authorName: user?.displayName || "ไม่ระบุชื่อ" });
        Alert.alert("โพสต์สำเร็จ!");
        reset();
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}
        >
            <View className="bg-yellow-400 px-4 py-3 flex-row items-center relative">
                <Text className="text-white font-bold text-lg text-center flex-1">
                    สร้างโพสต์
                </Text>
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="absolute right-4"
                >
                    <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
                <TouchableOpacity
                    onPress={() => router.push("/(modals)/select-community")}
                    className="flex-row items-center p-3 border border-gray-300 rounded-full mb-2"
                >
                    <Ionicons name="person-circle-outline" size={18} color="gray" />
                    <Text className="ml-2 text-gray-600">{community}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/(modals)/select-target")}
                    className="flex-row items-center p-3 border border-gray-300 rounded-full mb-4"
                >
                    <Ionicons name="eye-outline" size={18} color="gray" />
                    <Text className="ml-2 text-gray-600">{target}</Text>
                </TouchableOpacity>

                <TextInput
                    placeholder="คุณคิดอะไรอยู่"
                    multiline
                    value={content}
                    onChangeText={setContent}
                    className="text-base min-h-[120px] text-black"
                />

                <PostImagePicker images={images} setImages={setImages} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
