import React from "react";
import { View } from "react-native";
import { ThemedText } from "../../components/ThemedText";

export default function ExploreScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <ThemedText className="text-xl text-blue-600">Explore Screen</ThemedText>
    </View>
  );
}
