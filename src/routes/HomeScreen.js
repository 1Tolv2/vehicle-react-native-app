import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import VehicleList from "../components/molecules/VehicleList";
import VehiclePreviewModal from "../components/molecules/VehiclePreviewModal";

export default function HomeScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const toggleModal = (data) => {
    setModalData(data);
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View>
      <VehicleList toggleModal={toggleModal} navigation={navigation} />
      {isModalVisible && (
        <VehiclePreviewModal
          stateHandler={{ isModalVisible, setIsModalVisible }}
          data={modalData}
          navigate={navigation.navigate}
        />
      )}
    </View>
  );
}
