import React from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useFeedStore from "../../stores/useFeedStore";

export default function FeedScreen() {
    const posts = useFeedStore((state) => state.posts);
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-yellow-400 px-4 py-3 flex-row justify-between items-center">
                <Text className="text-white font-bold text-lg">TU TALK</Text>
                <TouchableOpacity>
                    <Ionicons name="search-outline" size={22} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {posts.length === 0 ? (
                    <Text className="text-center text-gray-500 mt-10">ยังไม่มีโพสต์</Text>
                ) : (
                    posts.map((post) => (
                        <TouchableOpacity
                            key={post.id}
                            onPress={() => router.push({ pathname: "/post/[id]", params: { id: post.id } })}
                            className="mb-4 p-4 border border-gray-200 rounded-lg"
                        >
                            <Text className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</Text>

                            <View className="flex-row items-center mb-1">
                                <Image
                                    source={{ uri: `https://i.pravatar.cc/150?u=${post.id}` }}
                                    className="w-6 h-6 rounded-full mr-2"
                                />
                                <Text className="text-sm font-medium text-black">{post.authorName || "ไม่ระบุชื่อ"}</Text>
                            </View>

                            <Text className="text-sm font-semibold text-yellow-600">{post.community}</Text>
                            <Text className="text-sm text-gray-500 mb-2">👁 {post.target}</Text>
                            <Text className="text-base text-black mb-2">{post.content}</Text>

                            {post.images.length > 0 && (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
                                    {post.images.map((uri, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri }}
                                            className="w-32 h-32 mr-2 rounded"
                                            resizeMode="cover"
                                        />
                                    ))}
                                </ScrollView>
                            )}

                            <View className="flex-row items-center gap-4">
                                <View className="flex-row items-center">
                                    <Ionicons name="heart-outline" size={18} color="gray" />
                                    <Text className="ml-1 text-gray-700 text-sm">{post.likes}</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Ionicons name="chatbubble-outline" size={18} color="gray" />
                                    <Text className="ml-1 text-gray-700 text-sm">{post.comments.length}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
}
