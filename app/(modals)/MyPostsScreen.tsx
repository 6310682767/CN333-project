import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/styles";
import { useTranslation } from "react-i18next";

const MyPostsScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>โพสต์ของฉัน</Text>
  </View>
);

export default MyPostsScreen;
