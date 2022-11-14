import React from "react";
import { ScrollView } from "react-native";
import VehicleIdentityArea from "../components/molecules/VehicleIdentityArea";
import VehicleInspectionData from "../components/molecules/VehicleInspectiondata";
import VehicleNotesList from "../components/molecules/VehicleNotesList";
import VehicleTechnicalData from "../components/molecules/VehicleTechnicalData";

export default function VehicleDetailScreen({ route, navigation }) {
  return (
    <ScrollView>
      <VehicleIdentityArea vehicle={route.params.data} />
      <VehicleTechnicalData vehicle={route.params.data} />
      <VehicleInspectionData vehicle={route.params.data} />
      <VehicleNotesList vehicle={route.params.data} />
    </ScrollView>
  );
}
