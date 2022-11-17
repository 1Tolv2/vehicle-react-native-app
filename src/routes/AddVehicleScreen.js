import React, { useState } from "react";
import { View } from "react-native";
import VehicleIdentityForm from "../components/organisms/VehicleIdentityForm";
import VehicleTechnicalForm from "../components/organisms/VehicleTechnicalForm";

export default function AddVehicleScreen({ navigation }) {
  const [formPart, setFormPart] = useState(1);
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
  const [vehicleTechnicalForm, setVehicleTechnicalForm] = useState({
    engineSize: 0,
    engineType: "",
    power: 0,
    mileage: 0,
    fuelCapacity: 0,
    fuelConsumption: 0,
    gearbox: "",
  });

  const handleSubmitForm = () => {
    console.log("SUBMITTING", vehicleIdentityForm, vehicleTechnicalForm);
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
        <VehicleTechnicalForm
          formState={vehicleTechnicalForm}
          setFormState={setVehicleTechnicalForm}
          handleSubmitForm={handleSubmitForm}
        />
      )}
    </View>
  );
}
