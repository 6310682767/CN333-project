import { View, TouchableOpacity, Modal, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { styled } from "nativewind";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";

const StyledView = styled(View);
const StyledText = styled(ThemedText);
const StyledTouchable = styled(TouchableOpacity);
const StyledScroll = styled(ScrollView);

const campuses = ["รังสิต", "ท่าพระจันทร์", "ลำปาง", "พัทยา"];
const communityRooms = [
  { icon: "language", label: "ถาม-ตอบทั่วไป" },
  { icon: "book", label: "วิชาการ" },
  { icon: "star", label: "รีวิววิชา & อาจารย์" },
  { icon: "home", label: "หอพัก" },
  { icon: "search", label: "ตามหาของหาย" },
  { icon: "storefront", label: "ร้านเด็ดในมอ" },
  { icon: "event", label: "กิจกรรม/ชมรม" },
  { icon: "newspaper", label: "ข่าวสาร" },
  { icon: "work", label: "ฝึกงาน/สหกิจศึกษา" },
];

export default function SidebarMenu({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [selectedCampus, setSelectedCampus] = useState("รังสิต");
  const [selectedCommunityRoom, setSelectedCommunityRoom] = useState("");
  const [showModal, setShowModal] = useState(visible);

  // กำหนดให้ใช้การแอนิเมชัน slide จากด้านซ้าย
  const slideAnim = useSharedValue(-400); // ค่าเริ่มต้นที่อยู่ทางซ้ายสุด

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      slideAnim.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      slideAnim.value = withTiming(-400, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      // ปิด modal หลังแอนิเมชันเสร็จ
      setTimeout(() => {
        setShowModal(false);
      }, 300);
    }
  }, [visible]);

  return (
    <Modal visible={showModal} transparent animationType="none">
      {/* ปิดการใช้ "slide" ใน Modal */}
      <Pressable className="flex-1" onPress={onClose}>
        <Animated.View
          className="flex-1 bg-white w-[80%] p-5 rounded-tr-3xl rounded-br-3xl"
          style={{ transform: [{ translateX: slideAnim }] }} // ใช้การแอนิเมชันในการเลื่อน
          onStartShouldSetResponder={() => true}
        >
          <StyledText className="text-3xl font-semibold mb-3 pt-14 text-gray-700">
            วิทยาเขต
          </StyledText>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {campuses.map((c) => (
              <StyledTouchable
                key={c}
                onPress={() => setSelectedCampus(c)}
                className={`px-3 py-1 rounded-full border ${
                  selectedCampus === c
                    ? "bg-red-500 border-red-500"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <StyledText
                  className={`text-sm ${
                    selectedCampus === c ? "text-white" : "text-gray-700"
                  }`}
                >
                  {c}
                </StyledText>
              </StyledTouchable>
            ))}
          </View>

          <StyledText className="text-3xl pt-10 font-semibold mb-3 text-gray-700">
            ห้องคอมมูนิตี้
          </StyledText>
          <View className="flex-row flex-wrap gap-2 mb-2">
            {communityRooms.map(({ icon, label }) => (
              <StyledTouchable
                key={label}
                onPress={() => setSelectedCommunityRoom(label)}
                className={`flex-row items-center px-3 py-1 rounded-full border ${
                  selectedCommunityRoom === label
                    ? "bg-red-500 border-red-500"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <MaterialIcons
                  name={icon as any}
                  size={16}
                  color={selectedCommunityRoom === label ? "#fff" : "#444"}
                  style={{ marginRight: 6 }}
                />
                <StyledText
                  className={`text-sm ${
                    selectedCommunityRoom === label
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </StyledText>
              </StyledTouchable>
            ))}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
