import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from "react-native";
import useCreatePostStore from "../../stores/useCreatePostStore";

const targets = [
    { id: "public", label: "ทุกคน", icon: "globe-outline" },
    { id: "faculty", label: "คณะเดียวกัน", icon: "people-outline" },
    { id: "major", label: "สาขาเดียวกัน", icon: "person-outline" },
];

export default function SelectTargetScreen() {
    const router = useRouter();
    const setTarget = useCreatePostStore((state) => state.setTarget);

    const handleSelect = (id: string, label: string) => {
        setTarget(label);
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="bg-yellow-400 px-4 py-3 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-lg ml-2">กลุ่มเป้าหมาย</Text>
            </View>

            <View className="px-4 py-3">
                <Text className="text-gray-700">
                    เลือกกลุ่มเป้าหมายที่จะสามารถมองเห็นโพสต์ของคุณ
                </Text>
            </View>

            <FlatList
                data={targets}
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
