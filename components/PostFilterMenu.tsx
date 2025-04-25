import { View, Modal, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";

const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(ThemedText);
const options = [
  { icon: "person-outline", label: "สำหรับคุณ" },
  { icon: "flame-outline", label: "เป็นที่นิยม" },
  { icon: "star-outline", label: "ติดดาว" },
  { icon: "time-outline", label: "ล่าสุด" },
];

export default function PostFilterMenu({
  visible,
  onClose,
  onOptionSelect,
  leftOffset,
  topOffset,
}: {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
  leftOffset: number;
  topOffset: number;
}) {
  const [showModal, setShowModal] = useState(visible);
  const opacityAnim = useSharedValue(0); // เลื่อนจากด้านบน
  const scaleAnim = useSharedValue(0.95);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      opacityAnim.value = withTiming(1, { duration: 250 });
      scaleAnim.value = withTiming(1, { duration: 250 });
    } else {
      opacityAnim.value = withTiming(0, { duration: 250 });
      scaleAnim.value = withTiming(0.95, { duration: 250 });
      setTimeout(() => setShowModal(false), 250);
    }
  }, [visible]);

  return (
    <Modal visible={showModal} transparent animationType="none">
      <Pressable className="flex-1" onPress={onClose}>
        <Animated.View
          className="bg-white p-4 rounded-xl shadow-lg mx-4 absolute z-50"
          style={{
            width: "50%",
            left: leftOffset, // ใช้ค่า leftOffset ที่ได้จากตำแหน่งโลโก้
            top: topOffset + 32 + 5, // ตั้งตำแหน่งให้ห่างจากโลโก้ 32px-line height + 5px
            transform: [{ scale: scaleAnim }],
          }}
          onStartShouldSetResponder={() => true}
        >
          {options.map(({ label, icon }) => (
            <StyledTouchable
              key={label}
              className="py-2 flex-row items-center"
              onPress={() => onOptionSelect(label)}
            >
              <Ionicons name={icon as any} size={18} color="#4B5563" />
              <StyledText className="text-gray-700 ml-2">{label}</StyledText>
            </StyledTouchable>
          ))}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
