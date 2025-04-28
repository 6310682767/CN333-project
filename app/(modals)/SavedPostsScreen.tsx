// SavedPostsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/styles";
import { useTranslation } from "react-i18next";

const SavedPostsScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>โพสต์ที่บันทึก</Text>
  </View>
);

export default SavedPostsScreen;
