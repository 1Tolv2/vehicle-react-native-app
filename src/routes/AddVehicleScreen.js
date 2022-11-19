import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { createVehicle, updateVehicle, getUser } from "../utils/api";
import VehicleIdentityForm from "../components/organisms/VehicleIdentityForm";
import VehicleTechnicalForm from "../components/organisms/VehicleTechnicalForm";

export default function AddVehicleScreen({ navigation, route }) {
  const [formPart, setFormPart] = useState(1);
  const [userSettings, setUserSettings] = useState(null);
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

  useEffect(() => {
    if (route.params?.data) {
      const {
        nickname,
        color,
        vehicleType,
        brand,
        model,
        inTraffic,
        specifications,
        registrationNumber,
        modelYear,
        modelSpecification,
        mileage,
      } = route.params.data;

      setVehicleIdentityForm({
        vehicleType,
        color: color.primaryColor,
        nickname,
        brand,
        model,
        year: modelYear?.toString(),
        licensePlate: registrationNumber,
        lastApprovedInspection: specifications.inspection.lastInspection,
        inspectionInterval:
          specifications.inspection.inspectionInterval?.toString() + " months",
        inTraffic,
      });
      setVehicleTechnicalForm({
        engineSize: modelSpecification.engine?.size?.toString(),
        engineType: modelSpecification.engine?.model,
        power: modelSpecification.engine?.powerKW?.toString(),
        mileage: mileage?.toString(),
        fuelCapacity: modelSpecification?.engine?.fuelCapacity?.toString(),
        fuelConsumption:
          modelSpecification?.engine?.fuelConsumption?.toString(),
        gearbox: modelSpecification?.gearbox,
      });
    }
  }, []);

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.data) {
          setUserSettings(res.data.user?.settings);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitForm = async () => {
    const formData = {
      registrationNumber: vehicleIdentityForm.licensePlate,
      vehicleType: vehicleIdentityForm.vehicleType,
      brand: vehicleIdentityForm.brand,
      model: vehicleIdentityForm.model,
      modelYear: parseInt(vehicleIdentityForm.year),
      color: { primaryColor: vehicleIdentityForm.color },
      nickname: vehicleIdentityForm.nickname,
      specifications: {
        inspection: {
          lastInspection: vehicleIdentityForm.lastApprovedInspection,
          inspectionInterval: parseInt(
            vehicleIdentityForm.inspectionInterval.split(" ")[0]
          ),
        },
      },
      inTraffic: vehicleIdentityForm.inTraffic,
      modelSpecification: {
        engine: {
          size: parseInt(vehicleTechnicalForm.engineSize),
          model: vehicleTechnicalForm.engineType,
          powerKW: parseInt(vehicleTechnicalForm.power),
          powerHP: parseInt(vehicleTechnicalForm.power) * 1.36,
          fuelCapacity: parseInt(vehicleTechnicalForm.fuelCapacity),
          fuelConsumption: vehicleTechnicalForm.fuelConsumption,
        },
        gearbox: {
          type: vehicleTechnicalForm.gearbox,
        },
      },
    };

    if (route.params?.data) {
      await updateVehicle(route.params?.data._id, formData);
      navigation.navigate("Home");
    } else {
      await createVehicle(formData);
      navigation.navigate("Home");
    }
  };
  return (
    <View style={{ marginTop: 20 }}>
      {formPart === 1 && (
        <VehicleIdentityForm
          navigate={navigation.navigate}
          nextForm={() => setFormPart(2)}
          formState={vehicleIdentityForm}
          setFormState={setVehicleIdentityForm}
          handleSubmitForm={handleSubmitForm}
          data={route.params?.data}
          language={userSettings?.language}
        />
      )}
      {formPart === 2 && (
        <VehicleTechnicalForm
          vehicleType={vehicleIdentityForm.vehicleType}
          formState={vehicleTechnicalForm}
          setFormState={setVehicleTechnicalForm}
          handleSubmitForm={handleSubmitForm}
          data={route.params?.data}
          language={userSettings?.language}
        />
      )}
    </View>
  );
}
