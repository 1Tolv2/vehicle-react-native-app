import React, { useState } from "react";
import { View } from "react-native";
import { createVehicle } from "../utils/api";
import VehicleIdentityForm from "../components/organisms/VehicleIdentityForm";
import VehicleTechnicalForm from "../components/organisms/VehicleTechnicalForm";

export default function AddVehicleScreen({ navigation }) {
  const [formPart, setFormPart] = useState(1);
  const [vehicleIdentityForm, setVehicleIdentityForm] = useState({
    vehicleType: 0,
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
    if (vehicleIdentityForm.vehicleType || vehicleIdentityForm.brand) {
    }
    const formData = {
      registrationNumber: vehicleIdentityForm.licensePlate,
      vehicleType: vehicleIdentityForm.vehicleType,
      brand: vehicleIdentityForm.brand,
      model: vehicleIdentityForm.model,
      modelYear: vehicleIdentityForm.year,
      color: { primaryColor: vehicleIdentityForm.color },
      nickname: vehicleIdentityForm.nickname,
      inspection: {
        lastInspection: vehicleIdentityForm.lastApprovedInspection,
        inspectionInterval: vehicleIdentityForm.inspectionInterval,
      },
      inTraffic: vehicleIdentityForm.inTraffic,
      modelSpecification: {
        engine: {
          size: vehicleTechnicalForm.engineSize,
          model: vehicleTechnicalForm.engineType,
          powerKW: vehicleTechnicalForm.power,
          powerHP: vehicleTechnicalForm.power * 1.36,
        },
        gearbox: {
          type: vehicleTechnicalForm.gearbox,
        },
      },
    };

    createVehicle(formData);
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
          vehicleType={vehicleIdentityForm.vehicleType}
          formState={vehicleTechnicalForm}
          setFormState={setVehicleTechnicalForm}
          handleSubmitForm={handleSubmitForm}
        />
      )}
    </View>
  );
}
