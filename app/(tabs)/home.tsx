import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useFeedStore from "../../stores/useFeedStore";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, TouchableWithoutFeedback } from "react-native"; // Add Modal import for dropdown

export default function FeedScreen() {
  const posts = useFeedStore((state) => state.posts);
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("โพสต์สำหรับคุณ");

  const toggleModal = () => setModalVisible(!modalVisible);
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <SafeAreaView style={{ flex: 0, backgroundColor: "#eab308" }}>
        <View className="bg-yellow-500 px-4 pt-4 flex-row items-center justify-between">
          <View className="flex-row items-center ">
            <TouchableOpacity>
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>

            {/* TU TALK and triangle icon */}
            <TouchableOpacity
              onPress={toggleModal}
              className="flex-row items-center"
            >
              <ThemedText
                className="text-white text-2xl mr-2 ml-5"
                type="title"
              >
                TU TALK
              </ThemedText>
              <Ionicons name="chevron-down" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search Icon */}
          <View className="flex-row items-center justify-end">
            <TouchableOpacity>
              <Ionicons name="search-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Modal for dropdown */}
      {modalVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View className="flex-1 justify-center items-center bg-black opacity-50">
              <TouchableWithoutFeedback>
                <View className="bg-white p-4 rounded-lg shadow-lg">
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("โพสต์สำหรับคุณ")}
                  >
                    <Text className="text-black py-2 px-4">โพสต์สำหรับคุณ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("เป็นที่นิยม")}
                  >
                    <Text className="text-black py-2 px-4">เป็นที่นิยม</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("ติดดาว")}
                  >
                    <Text className="text-black py-2 px-4">ติดดาว</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("ล่าสุด")}
                  >
                    <Text className="text-black py-2 px-4">ล่าสุด</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {posts.length === 0 ? (
          <ThemedText className="text-center text-gray-500 mt-10">
            ยังไม่มีโพสต์
          </ThemedText>
        ) : (
          posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() =>
                router.push({ pathname: "/post/[id]", params: { id: post.id } })
              }
              className="mb-4 p-4 border border-gray-200 rounded-lg"
            >
              <ThemedText className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </ThemedText>

              <View className="flex-row items-center mb-1">
                <Image
                  source={{ uri: `https://i.pravatar.cc/150?u=${post.id}` }}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <ThemedText className="text-sm font-medium text-black">
                  {post.authorName || "ไม่ระบุชื่อ"}
                </ThemedText>
              </View>

              <ThemedText className="text-sm font-semibold text-yellow-600">
                {post.community}
              </ThemedText>
              <ThemedText className="text-sm text-gray-500 mb-2">
                👁 {post.target}
              </ThemedText>
              <ThemedText className="text-base text-black mb-2">
                {post.content}
              </ThemedText>

              {post.images.length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-2"
                >
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
                  <ThemedText className="ml-1 text-gray-700 text-sm">
                    {post.likes}
                  </ThemedText>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="chatbubble-outline" size={18} color="gray" />
                  <ThemedText className="ml-1 text-gray-700 text-sm">
                    {post.comments.length}
                  </ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
