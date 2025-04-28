import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/styles";
import { useTranslation } from "react-i18next";

const StarredUsersScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>คนที่ติดดาว</Text>
  </View>
);

export default StarredUsersScreen;
