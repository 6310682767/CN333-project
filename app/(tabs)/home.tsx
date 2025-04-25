// home.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  findNodeHandle,
  UIManager,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import SidebarMenu from "@/components/SlidebarMenu";
import PostFilterMenu from "@/components/PostFilterMenu";
import { usePosts } from "@/hooks/usePost";
import axios from "axios";
import { Video, ResizeMode } from "expo-av";

// Define the type for posts
type Post = {
  _id: string;
  createdAt: string;
  authorName: string;
  authorAvatar?: string;
  community: string;
  target: string;
  content: string;
  images?: string[];
  videos?: string[];
  likes: number;
  comments?: { _id: string }[]; // or just number, depending on your schema
};

export default function FeedScreen() {
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [campus, setCampus] = useState<string | undefined>(undefined);
  const [community, setCommunity] = useState<string | undefined>(undefined);

  const [menuVisible, setMenuVisible] = useState(false);
  const [postFilterVisible, setPostFilterVisible] = useState(false);
  const [TUPositionX, setTUPositionX] = useState(0);
  const [TUPositionY, setTUPositionY] = useState(0);
  const TUTextRef = useRef(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false); // เพิ่ม state สำหรับการรีเฟรช

  // ✅ ดึงข้อมูลจาก custom hook
  const { posts: fetchedPosts, loading } = usePosts(
    selectedFilter,
    campus,
    community
  );

  const togglePostFilter = () => {
    if (TUTextRef.current) {
      const handle = findNodeHandle(TUTextRef.current);
      if (handle) {
        UIManager.measureInWindow(handle, (x, y) => {
          setTUPositionX(x);
          setTUPositionY(y);
          setPostFilterVisible((prev) => !prev); // Toggle visibility
        });
      }
    }
  };

  const handleOptionSelect = (option: string) => {
    const filterMap: Record<string, string> = {
      สำหรับคุณ: "personalized",
      เป็นที่นิยม: "popular",
      ติดดาว: "starred",
      ล่าสุด: "latest",
    };

    const newFilter = filterMap[option]; // ใช้ trim() เพื่อลบช่องว่างที่ไม่จำเป็น

    setSelectedFilter(newFilter); // เปลี่ยนค่า selectedFilter
    setPostFilterVisible(false); // ปิดเมนู
  };

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get("http://192.168.1.33:5000/api/posts", {
        params: {
          filter: selectedFilter, // เปลี่ยนเป็น "popular", "starred" ฯลฯ
          campus: campus, // ใส่ค่า campus ที่ต้องการ
          community: community, // ใส่ค่า community ที่ต้องการ
        },
      });
      setPosts(response.data);
      console.log("Response data: ", response.data); // พิมพ์ข้อมูลที่ได้รับจาก API
    } catch (err) {
      console.error("Error fetching posts: ", err); // เพิ่มคำสั่งนี้เพื่อดูข้อผิดพลาดใน console
      setError("ไม่สามารถดึงข้อมูลโพสต์ได้");
    } finally {
      setLoad(false);
      setIsRefreshing(false); // หยุดการรีเฟรช
    }
  }, [selectedFilter, campus, community]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ฟังก์ชันที่ใช้สำหรับรีเฟรช
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchPosts();
  }, [selectedFilter, campus, community]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <ThemedText>{error}</ThemedText>;
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <SafeAreaView style={{ flex: 0, backgroundColor: "#eab308" }}>
        <View className="bg-yellow-500 px-4 pt-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>

            {/* TU TALK and triangle icon */}
            <TouchableOpacity
              onPress={togglePostFilter}
              className="flex-row items-center"
            >
              <View ref={TUTextRef}>
                <ThemedText
                  className="text-white text-2xl mr-2 ml-5"
                  type="title"
                >
                  TU TALK
                </ThemedText>
              </View>
              <Ionicons name="chevron-down" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search Icon */}
          <TouchableOpacity>
            <Ionicons name="search-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Post Filter Dropdown */}
      <PostFilterMenu
        visible={postFilterVisible}
        onClose={() => setPostFilterVisible(false)}
        onOptionSelect={handleOptionSelect}
        leftOffset={TUPositionX}
        topOffset={TUPositionY}
      />

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#eab308"
            style={{ marginTop: 50 }}
          />
        ) : fetchedPosts.length === 0 ? (
          <ThemedText className="text-center text-gray-500 mt-10">
            ยังไม่มีโพสต์
          </ThemedText>
        ) : (
          posts.map((post) => (
            <TouchableOpacity
              key={post._id}
              onPress={() =>
                router.push({
                  pathname: "/post/[id]",
                  params: { id: post._id },
                })
              }
              className="mb-4 p-4 border border-gray-200 rounded-lg"
            >
              <ThemedText className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </ThemedText>

              <View className="flex-row items-center mb-2">
                <Image
                  source={{
                    uri:
                      post.authorAvatar ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                  }}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <ThemedText className="text-sm font-medium text-black">
                  {post.authorName || "ไม่ระบุชื่อ"}
                </ThemedText>
              </View>

              <ThemedText className="text-sm font-semibold text-yellow-600 mb-1">
                {post.community}
              </ThemedText>
              <ThemedText className="text-sm text-gray-500 mb-2">
                👁 {post.target || "ทุกคน"}
              </ThemedText>
              <ThemedText className="text-base text-black mb-3">
                {post.content}
              </ThemedText>

              {/* Images */}
              {(post.images ?? []).length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-3"
                >
                  {post.images?.map((uri, index) => (
                    <Image
                      key={index}
                      source={{ uri }}
                      className="w-36 h-36 mr-3 rounded-lg"
                      resizeMode="cover"
                    />
                  ))}
                </ScrollView>
              )}

              {/* Videos */}
              {(post.videos ?? []).length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-3"
                >
                  {post.videos?.map((uri, index) => (
                    <View
                      key={index}
                      className="w-72 h-48 mr-3 rounded-lg overflow-hidden bg-black"
                    >
                      <Video
                        source={{ uri }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode={ResizeMode.COVER}
                        shouldPlay={false}
                        useNativeControls
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                  ))}
                </ScrollView>
              )}

              <View className="flex-row items-center gap-5 mt-2">
                <View className="flex-row items-center">
                  <Ionicons name="heart-outline" size={20} color="gray" />
                  <ThemedText className="ml-1 text-gray-700 text-sm">
                    {post.likes}
                  </ThemedText>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="chatbubble-outline" size={20} color="gray" />
                  <ThemedText className="ml-1 text-gray-700 text-sm">
                    {post.comments?.length || 0}
                  </ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Sidebar Menu */}
      <SidebarMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </View>
  );
}
