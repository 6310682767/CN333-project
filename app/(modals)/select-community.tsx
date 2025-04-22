import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    View, Text, TouchableOpacity, FlatList, SafeAreaView,
} from "react-native";
import useCreatePostStore from "../../stores/useCreatePostStore";

const communities = [
    { id: "general", label: "ทั่วไป", icon: "globe-outline" },
    { id: "academic", label: "วิชาการ", icon: "school-outline" },
    { id: "review", label: "รีวิววิชา & อาจารย์", icon: "book-outline" },
    { id: "dorm", label: "หอพัก", icon: "home-outline" },
    { id: "lost", label: "ตามหาของหาย", icon: "search-outline" },
    { id: "shop", label: "ร้านเด็ดในมอ", icon: "cafe-outline" },
    { id: "activity", label: "กิจกรรม/ชมรม", icon: "calendar-outline" },
    { id: "news", label: "ข่าวสาร", icon: "notifications-outline" },
    { id: "intern", label: "ฝึกงาน/สหกิจศึกษา", icon: "briefcase-outline" },
];

export default function SelectCommunityScreen() {
    const router = useRouter();
    const setCommunity = useCreatePostStore((state) => state.setCommunity);

    const handleSelect = (id: string, label: string) => {
        setCommunity(label);
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="bg-yellow-400 px-4 py-3 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-lg ml-2">ห้องคอมมูนิตี้</Text>
            </View>

            <View className="px-4 py-3">
                <Text className="text-gray-700">เลือกห้องคอมมูนิตี้สำหรับโพสต์ของคุณ</Text>
            </View>

            <FlatList
                data={communities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleSelect(item.id, item.label)}
                        className="flex-row items-center px-4 py-3"
                    >
                        <Ionicons name={item.icon as any} size={20} className="mr-2" />
                        <Text className="flex-1 text-base text-black">{item.label}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}
