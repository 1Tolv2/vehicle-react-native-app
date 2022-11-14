import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import VehicleList from "../components/molecules/VehicleList";

export default function HomeScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View>
      <Text>Home Screen</Text>
      <VehicleList
        toggleModal={() => setIsModalVisible(!isModalVisible)}
        navigation={navigation}
      />
    </View>
  );
}
