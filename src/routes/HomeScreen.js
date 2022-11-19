import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View } from "react-native";
import TabMenu from "../components/molecules/TabMenu";
import VehicleList from "../components/molecules/VehicleList";
import VehiclePreviewModal from "../components/molecules/VehiclePreviewModal";
import { getUser } from "../utils/api";

export default function HomeScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [userSettings, setUserSettings] = useState(null);

  const isFocused = useIsFocused();

  const toggleModal = (data) => {
    setModalData(data);
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.data) {
          console.log(res.data.user?.settings);
          setUserSettings(res.data.user?.settings);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View style={{ height: "100%" }}>
      <VehicleList
        toggleModal={toggleModal}
        navigation={navigation}
        isFocused={isFocused}
        userSettings={userSettings}
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
