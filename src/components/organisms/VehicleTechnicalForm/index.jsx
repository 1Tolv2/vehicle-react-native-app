import { View, Text, ScrollView } from "react-native";
import React from "react";
import Heading from "../../atoms/Heading";
import InputField from "../../atoms/InputField";

const VehicleTechnicalForm = ({
  setFormState,
  formState,
  vehicleType,
  handleSubmitForm,
}) => {
  // engineSize: 0,
  // engineType: "",
  // power: 0,
  // mileage: 0,
  // fuelCapacity: 0,
  // fuelConsumption: 0,
  // gearbox: "",

  const handleFormState = (value, name) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "white", padding: 10 }}>
      <Heading type="h1" color="orange">
        Technical Details
      </Heading>
      <Heading type="h2">Engine</Heading>
      <InputField
        name="engineSize"
        label="Size"
        placeholder="Ex. 1.2 liter, 600cc"
        value={formState.engineSize}
        setValue={handleFormState}
        keyboardType="numeric"
        unit={vehicleType === 1 ? "liter" : "cc"}
      />
    </ScrollView>
  );
};

export default VehicleTechnicalForm;
