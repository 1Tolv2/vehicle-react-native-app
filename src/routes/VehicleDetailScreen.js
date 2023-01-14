import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import VehicleIdentityArea from "../components/molecules/VehicleIdentityArea";
import VehicleInspectionData from "../components/molecules/VehicleInspectionData";
import VehicleNotesList from "../components/molecules/VehicleNotesList";
import VehicleTechnicalData from "../components/molecules/VehicleTechnicalData";
import { getUser } from "../utils/api";

export default function VehicleDetailScreen({ route, navigation }) {
  const [userSettings, setUserSettings] = useState(null);
  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.data) {
          setUserSettings(res.data.user?.settings);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <ScrollView>
      <VehicleIdentityArea
        vehicle={route.params.data}
        navigate={navigation.navigate}
        userSettings={userSettings}
      />
      <VehicleTechnicalData
        vehicle={route.params.data}
        userSettings={userSettings}
      />
      <VehicleInspectionData
        vehicle={route.params.data}
        userSettings={userSettings}
      />
      <VehicleNotesList
        vehicle={route.params.data}
        userSettings={userSettings}
      />
    </ScrollView>
  );
}
