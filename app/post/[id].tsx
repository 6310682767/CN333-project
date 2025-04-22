import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Modal,
    Pressable,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useFeedStore from "../../stores/useFeedStore";

export default function PostDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const post = useFeedStore((state) => state.posts.find((p) => p.id === id));
    const toggleLike = useFeedStore((state) => state.toggleLike);
    const toggleSave = useFeedStore((state) => state.toggleSave);
    const addComment = useFeedStore((state) => state.addComment);
    const deletePost = useFeedStore((state) => state.deletePost);

    const [comment, setComment] = useState("");
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!post) return <Text className="p-4">โพสต์ไม่พบ</Text>;

    const handleComment = () => {
        if (!comment.trim()) return;
        addComment(post.id, { user: "You", content: comment });
        setComment("");
    };

    const handleDelete = () => {
        Alert.alert("ลบโพสต์", "คุณแน่ใจหรือไม่ว่าต้องการลบ?", [
            { text: "ยกเลิก", style: "cancel" },
            {
                text: "ลบเลย",
                style: "destructive",
                onPress: () => {
                    deletePost(post.id);
                    router.back();
                },
            },
        ]);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
            style={{ flex: 1 }}
        >
            <View className="flex-1 bg-white">
                {/* Header */}
                <View className="bg-yellow-400 px-4 py-3 flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-lg">โพสต์</Text>
                    <View className="w-6" />
                </View>

                <ScrollView className="px-4 pt-4" showsVerticalScrollIndicator={false}>
                    <Text className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleString()}
                    </Text>

                    {/* Avatar + ชื่อผู้โพสต์ */}
                    <View className="flex-row items-center gap-2 mt-2 mb-1">
                        <Image
                            source={{ uri: `https://i.pravatar.cc/150?u=${post.id}` }}
                            className="w-7 h-7 rounded-full"
                        />
                        <Text className="text-sm font-medium text-black">{post.authorName}</Text>
                    </View>

                    <Text className="text-yellow-600 font-semibold">{post.community}</Text>
                    <Text className="text-gray-600 mb-2">👁 {post.target}</Text>
                    <Text className="text-lg text-black mb-4">{post.content}</Text>

                    {post.images.map((uri, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setSelectedImage(uri);
                                setShowImageModal(true);
                            }}
                        >
                            <Image
                                source={{ uri }}
                                className="w-full h-60 mb-4 rounded"
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}

                    <View className="flex-row items-center gap-4 mb-2">
                        <TouchableOpacity onPress={() => toggleLike(post.id)} className="flex-row items-center">
                            <Ionicons name={post.liked ? "heart" : "heart-outline"} size={20} color="tomato" />
                            <Text className="ml-1 text-gray-700">{post.likes}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => toggleSave(post.id)} className="flex-row items-center">
                            <Ionicons name={post.saved ? "bookmark" : "bookmark-outline"} size={20} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleDelete} className="ml-auto">
                            <Ionicons name="trash-outline" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>

                    {/* คอมเมนต์ */}
                    <View className="border-t border-gray-200 mt-4 pt-4">
                        <Text className="text-gray-700 font-medium mb-2">ความคิดเห็น</Text>

                        {post.comments.map((cmt) => (
                            <View key={cmt.id} className="flex-row items-start mb-3">
                                <Image
                                    source={{ uri: `https://i.pravatar.cc/150?u=${cmt.id}` }}
                                    className="w-6 h-6 rounded-full mt-1 mr-2"
                                />
                                <View className="flex-1">
                                    <Text className="text-sm font-medium text-black">{cmt.user}</Text>
                                    <Text className="text-gray-700">{cmt.content}</Text>
                                    <Text className="text-xs text-gray-400">{new Date(cmt.createdAt).toLocaleString()}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* กล่องเขียนคอมเมนต์ */}
                <View className="flex-row items-center px-4 py-2 border-t border-gray-200 bg-white">
                    <TextInput
                        value={comment}
                        onChangeText={setComment}
                        placeholder="เขียนความคิดเห็น..."
                        className="flex-1 mr-2 border px-3 py-2 rounded-full border-gray-300"
                    />
                    <TouchableOpacity onPress={handleComment}>
                        <Ionicons name="send" size={22} color="#fbbf24" />
                    </TouchableOpacity>
                </View>

                {/* รูปเต็ม */}
                <Modal visible={showImageModal} transparent animationType="fade">
                    <Pressable
                        className="flex-1 bg-black/90 justify-center items-center"
                        onPress={() => setShowImageModal(false)}
                    >
                        {selectedImage && (
                            <Image
                                source={{ uri: selectedImage }}
                                className="w-full h-[80%] rounded-lg"
                                resizeMode="contain"
                            />
                        )}
                    </Pressable>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    );
}
