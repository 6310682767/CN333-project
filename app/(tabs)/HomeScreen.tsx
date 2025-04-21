import { View } from "react-native";
import { ThemedText } from "../../components/ThemedText";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-200">
      <ThemedText className="text-xl text-red-500">สวัสดี TU TALK!</ThemedText>
    </View>
  );
}
