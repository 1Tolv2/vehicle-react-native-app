import { View, ScrollView, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Heading from "../../atoms/Heading";
import ImageInput from "../../molecules/ImageInput";
import theme from "../../theme";
import InputField from "../../atoms/InputField";
import MainButton from "../../atoms/MainButton";
import RadioButton from "../../atoms/RadioButton";
import LabelText from "../../atoms/LabelText";
import ErrorText from "../../atoms/ErrorText";

const { colors } = theme;

const VehicleIdentityForm = ({
  nextForm,
  handleSubmitForm,
  formState,
  setFormState,
  data,
  language,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const colorOptions = [
    {
      value: "red",
      color: "red",
    },
    {
      value: "yellow",
      color: "yellow",
    },
    {
      value: "blue",
      color: "blue",
    },
    {
      value: "orange",
      color: "orange",
    },
    {
      value: "green",
      color: "green",
    },
    {
      value: "purple",
      color: "purple",
    },
    {
      value: "gold",
      color: "gold",
    },
    {
      value: "silver",
      color: "silver",
    },
    {
      value: "black",
      color: "black",
    },
    {
      value: "white",
      color: "white",
    },
  ];
  const fields = [
    {
      label: language === "sv" ? "Smeknamn" : "Nickname",
      placeholder: "Ex. K.I.T.T., General Lee, etc.",
      name: "nickname",
    },
    {
      label: language === "sv" ? "Märke" : "Brand",
      placeholder: "Ex. Volvo, Toyota, SAAB, etc.",
      name: "brand",
      required: true,
    },
    {
      label: language === "sv" ? "Modell" : "Model",
      placeholder: "Ex. V70, Corolla, 9000, etc.",
      name: "model",
    },
    {
      label: language === "sv" ? "Årtal" : "Year",
      placeholder: "Ex. 1998, 2001, 2003, etc.",
      name: "year",
      keyboardType: "numeric",
    },
    {
      label: language === "sv" ? "Registreringsnummer" : "License Plate",
      placeholder: "Ex. ABC-123, Ecto-1, etc.",
      name: "licensePlate",
    },
  ];
  const handleFormState = (value, name) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "white", padding: 10 }}>
      <Heading type="h1" color="orange">
        {language === "sv" ? "Fordonsidentitet" : "Vehicle identity"}
      </Heading>
      <ImageInput
        name="vehicleType"
        title={language === "sv" ? "Fordonstyp" : "Vehicle type"}
        data={[
          {
            value: 2,
            color: "transparent",

            icon: require("../../../../assets/icons/motorcycle_filled.png"),
          },
          {
            value: 1,
            color: "transparent",
            icon: require("../../../../assets/icons/directions_car.png"),
          },
        ]}
        setValue={handleFormState}
        stateValue={formState.vehicleType}
        required
      />
      {fields.map(
        ({ label, placeholder, name, keyboardType, required }, index) => {
          return (
            <InputField
              key={index}
              name={name}
              label={label || ""}
              placeholder={placeholder || ""}
              value={formState[name]}
              setValue={handleFormState}
              keyboardType={keyboardType || "default"}
              required={required}
            />
          );
        }
      )}
      <ImageInput
        name="color"
        title="Color"
        setValue={handleFormState}
        stateValue={formState.color}
        data={colorOptions}
      />
      <Heading type="h1" color="orange">
        Status
      </Heading>
      <RadioButton
        name="inTraffic"
        label="In traffic?"
        setValue={handleFormState}
        value={formState.inTraffic}
      />
      <InputField
        name="lastApprovedInspection"
        label="Last approved inspection"
        placeholder="YYYY-MM-DD"
        value={formState.lastApprovedInspection}
        setValue={handleFormState}
        keyboardType="numeric"
      />
      <LabelText fontWeight="bold" size={20} fullWidth margin={5}>
        Inspection interval
      </LabelText>
      <View style={styles.radioButtons}>
        <RadioButton
          name="inspectionInterval"
          multiple
          label="14 months"
          setValue={handleFormState}
          value={formState.inspectionInterval}
        />
        <RadioButton
          name="inspectionInterval"
          multiple
          label="24 months"
          setValue={handleFormState}
          value={formState.inspectionInterval}
        />
      </View>
      <View style={styles.radioButtons}>
        <RadioButton
          name="inspectionInterval"
          multiple
          label="36 months"
          setValue={handleFormState}
          value={formState.inspectionInterval}
        />
        <RadioButton
          name="inspectionInterval"
          multiple
          label="No inspection"
          setValue={handleFormState}
          value={formState.inspectionInterval}
        />
      </View>
      <View style={{ marginVertical: 30 }}>
        {errorMessage.length > 0 && <ErrorText>{errorMessage}</ErrorText>}
        <MainButton
          title={`${data ? "Edit" : "Add"} technical specifications`}
          bgColor="orange"
          event={() => {
            if (formState.vehicleType && formState.brand) {
              nextForm();
            } else {
              setErrorMessage("Please fill in all required fields");
            }
          }}
          my={5}
        />
        {!data && (
          <MainButton
            title="Add more information later"
            bgColor="lightGrey"
            event={handleSubmitForm}
            my={5}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  radioButtons: {
    width: "100%",
    height: 90,
    flexDirection: "row",
  },
});

export default VehicleIdentityForm;
