import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View } from "react-native";
import TabMenu from "../components/molecules/TabMenu";
import VehicleList from "../components/molecules/VehicleList";
import VehiclePreviewModal from "../components/molecules/VehiclePreviewModal";

export default function HomeScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const isFocused = useIsFocused();

  const toggleModal = (data) => {
    setModalData(data);
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={{ height: "100%" }}>
      <VehicleList
        toggleModal={toggleModal}
        navigation={navigation}
        isFocused={isFocused}
      />
      {isModalVisible && (
        <VehiclePreviewModal
          stateHandler={{ isModalVisible, setIsModalVisible }}
          data={modalData}
          navigate={navigation.navigate}
        />
      )}
      <TabMenu navigate={navigation.navigate} />
    </View>
  );
}
