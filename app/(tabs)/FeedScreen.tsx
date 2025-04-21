import React from "react";
import { View } from "react-native";
import { ThemedText } from "../../components/ThemedText";

export default function FeedScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-100">
      <ThemedText className="text-xl text-red-500">
        Welcome to the Feed Screen!
      </ThemedText>
    </View>
  );
}
