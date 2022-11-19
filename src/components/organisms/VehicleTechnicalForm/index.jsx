import { View, Text, ScrollView } from "react-native";
import React from "react";
import Heading from "../../atoms/Heading";
import InputField from "../../atoms/InputField";
import RegularText from "../../atoms/RegularText";
import MainButton from "../../atoms/MainButton";
import RadioButton from "../../atoms/RadioButton";
import LabelText from "../../atoms/LabelText";

const VehicleTechnicalForm = ({
  setFormState,
  formState,
  vehicleType,
  handleSubmitForm,
  data,
  language,
}) => {
  const [horsePower, setHorsePower] = React.useState(0);

  const handleFormState = (value, name) => {
    if (name === "gearbox") {
      if (value === "Manuell") {
        value = "manual";
      } else if (value === "Automat") {
        value = "automatic";
      }
    }

    setFormState({
      ...formState,
      [name]: value?.toLowerCase(),
    });
    if (name === "power") {
      setHorsePower(Math.floor(value * 1.35962));
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white", padding: 10, width: "100%" }}
    >
      <Heading type="h1" color="orange">
        {language === "sv" ? "Tekniska detaljer" : "Technical Details"}
      </Heading>
      <Heading type="h2">{language === "sv" ? "Motor" : "Engine"}</Heading>
      <InputField
        name="engineSize"
        label="Size"
        placeholder={
          vehicleType === 1 ? "Ex. 1.6, 2.3, etc." : "Ex. 125, 600, 1300, etc."
        }
        value={formState.engineSize}
        setValue={handleFormState}
        keyboardType="numeric"
        unit={vehicleType === 1 ? "liter" : "cc"}
      />
      <InputField
        name="engineType"
        label={language === "sv" ? "Modell" : "Type"}
        placeholder="Ex. B202, V8, Inline-4, etc."
        value={formState.engineType}
        setValue={handleFormState}
        keyboardType="default"
      />
      <InputField
        name="power"
        label={language === "sv" ? "Effekt" : "Power"}
        placeholder="Ex. 81, 35, etc."
        value={formState.power}
        setValue={handleFormState}
        keyboardType="numeric"
        unit="kW"
      />
      <RegularText>
        {language === "sv" ? "Hästkrafter" : "Horsepower:"} {horsePower}
      </RegularText>
      <InputField
        name="mileage"
        label={language === "sv" ? "Miltal" : "Mileage"}
        placeholder="Ex. 2400, 16000, 26000, etc."
        value={formState.mileage}
        setValue={handleFormState}
        keyboardType="numeric"
        unit="mil"
      />
      <InputField
        name="fuelCapacity"
        label={language === "sv" ? "Bränslekapacitet" : "Fuel Capacity"}
        placeholder="Ex. 18, 35, etc."
        value={formState.fuelCapacity}
        setValue={handleFormState}
        keyboardType="numeric"
        unit="liter"
      />
      <InputField
        name="fuelConsumption"
        label={language === "sv" ? "Bränslekonsumption" : "Fuel Consumption"}
        placeholder="Ex. 0.3, 0.6, 1 etc."
        value={formState.fuelConsumption}
        setValue={handleFormState}
        keyboardType="numeric"
        unit="l/mil"
      />
      <LabelText fontWeight="bold" size={20} fullWidth margin={5}>
        Gearbox
      </LabelText>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <RadioButton
          multiple
          name="gearbox"
          label={language === "sv" ? "Manuell" : "Manual"}
          setValue={handleFormState}
          value={formState.gearbox}
        />
        <RadioButton
          multiple
          name="gearbox"
          label={language === "sv" ? "Automat" : "Automatic"}
          setValue={handleFormState}
          value={formState.gearbox}
        />
      </View>
      <MainButton
        title={`${data ? "Save" : "Add"} vehicle`}
        bgColor="orange"
        event={handleSubmitForm}
      />
    </ScrollView>
  );
};

export default VehicleTechnicalForm;
