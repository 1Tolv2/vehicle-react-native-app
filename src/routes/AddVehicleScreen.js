import React, { useState } from "react";
import { View } from "react-native";
import VehicleIdentityForm from "../components/organisms/VehicleIdentityForm";
import VehicleTechnicalForm from "../components/organisms/VehicleTechnicalForm";

export default function AddVehicleScreen({ navigation }) {
  const [formPart, setFormPart] = useState(1);

  const handleSubmitForm = (form) => {
    console.log("SUBMITTING", form);
  };
  return (
    <View style={{ marginTop: 20 }}>
      {formPart === 1 && (
        <VehicleIdentityForm
          navigate={navigation.navigate}
          nextForm={() => setFormPart(formPart + 1)}
          handleSubmitForm={handleSubmitForm}
        />
      )}
      {formPart === 2 && (
        <VehicleTechnicalForm handleSubmitForm={handleSubmitForm} />
      )}
    </View>
  );
}
