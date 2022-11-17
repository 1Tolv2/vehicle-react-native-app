import React, { useState } from "react";
import { View } from "react-native";
import VehicleIdentityForm from "../components/organisms/VehicleIdentityForm";
import VehicleTechnicalForm from "../components/organisms/VehicleTechnicalForm";

export default function AddVehicleScreen({ navigation }) {
  const [formPart, setFormPart] = useState(1);
  // const [chosenColor, setChosenColor] = useState(null);
  // const [nickname, setNickname] = useState("");
  // const [brand, setBrand] = useState("");
  // const [model, setModel] = useState("");
  // const [year, setYear] = useState("");
  // const [licensePlate, setLicensePlate] = useState("");
  // const [lastApprovedInspection, setLastApprovedInspection] = useState("");
  // const [inspectionInterval, setInspectionInterval] = useState("");
  // const [inTraffic, setInTraffic] = useState(false);

  const [vehicleIdentityForm, setVehicleIdentityForm] = useState({
    color: "",
    nickname: "",
    brand: "",
    model: "",
    year: "",
    licensePlate: "",
    lastApprovedInspection: "",
    inspectionInterval: "",
    inTraffic: false,
  });

  const handleSubmitForm = () => {
    console.log("SUBMITTING", vehicleIdentityForm);
  };
  return (
    <View style={{ marginTop: 20 }}>
      {formPart === 1 && (
        <VehicleIdentityForm
          navigate={navigation.navigate}
          nextForm={() => setFormPart(formPart + 1)}
          formState={vehicleIdentityForm}
          setFormState={setVehicleIdentityForm}
          handleSubmitForm={handleSubmitForm}
        />
      )}
      {formPart === 2 && (
        <VehicleTechnicalForm handleSubmitForm={handleSubmitForm} />
      )}
    </View>
  );
}
