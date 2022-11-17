import { View, ScrollView, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Heading from "../../atoms/Heading";
import ImageInput from "../../molecules/ImageInput";
import theme from "../../theme";
import InputField from "../../atoms/InputField";
import MainButton from "../../atoms/MainButton";
import RadioButton from "../../atoms/RadioButton";
import LabelText from "../../atoms/LabelText";

const { colors } = theme;

const VehicleIdentityForm = ({ nextForm, handleSubmitForm }) => {
  const [chosenColor, setChosenColor] = useState(null);
  const [nickname, setNickname] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [lastApprovedInspection, setLastApprovedInspection] = useState("");
  const [inspectionInterval, setInspectionInterval] = useState("");
  const [inTraffic, setInTraffic] = useState(false);

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
      label: "Nickname",
      placeholder: "Ex. K.I.T.T., General Lee, etc.",
      value: nickname,
      setValue: setNickname,
    },
    {
      label: "Brand *",
      placeholder: "Ex. Volvo, Toyota, SAAB, etc.",
      value: brand,
      setValue: setBrand,
      required: true,
    },
    {
      label: "Model",
      placeholder: "Ex. V70, Corolla, 9000, etc.",
      value: model,
      setValue: setModel,
    },
    {
      label: "Year",
      placeholder: "Ex. 1998, 2001, 2003, etc.",
      value: year,
      setValue: setYear,
      keyboardType: "numeric",
    },
    {
      label: "License Plate",
      placeholder: "Ex. ABC-123, Ecto-1, etc.",
      value: licensePlate,
      setValue: setLicensePlate,
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "white", padding: 10 }}>
      <Heading type="h1" color="orange">
        Vehicle identity
      </Heading>
      <ImageInput
        title="Vehicle type"
        data={[
          {
            value: 1,
            color: "transparent",

            icon: require("../../../../assets/icons/motorcycle_filled.png"),
          },
          {
            value: 2,
            color: "transparent",
            icon: require("../../../../assets/icons/directions_car.png"),
          },
        ]}
        setValue={setChosenColor}
        stateValue={chosenColor}
      />
      {fields.map(
        (
          { label, placeholder, value, setValue, keyboardType, required },
          index
        ) => (
          <InputField
            key={index}
            label={label || ""}
            placeholder={placeholder || ""}
            value={value}
            setValue={setValue}
            keyboardType={keyboardType || "default"}
            required={required}
          />
        )
      )}
      <ImageInput
        title="Color"
        setValue={setChosenColor}
        stateValue={chosenColor}
        data={colorOptions}
      />
      <Heading type="h1" color="orange">
        Status
      </Heading>
      <RadioButton
        label="In traffic?"
        setValue={setInTraffic}
        value={inTraffic}
      />
      <InputField
        label="Last approved inspection"
        placeholder="YYYY-MM-DD"
        value={lastApprovedInspection}
        setValue={setLastApprovedInspection}
        keyboardType="numeric"
      />
      <LabelText fontWeight="bold" size={20} fullWidth margin={5}>
        Inspection interval
      </LabelText>
      <View style={styles.radioButtons}>
        <RadioButton
          multiple
          label="14 months"
          setValue={setInspectionInterval}
          value={inspectionInterval}
        />
        <RadioButton
          multiple
          label="24 months"
          setValue={setInspectionInterval}
          value={inspectionInterval}
        />
      </View>
      <View style={styles.radioButtons}>
        <RadioButton
          multiple
          label="36 months"
          setValue={setInspectionInterval}
          value={inspectionInterval}
        />
        <RadioButton
          multiple
          label="No inspection"
          setValue={setInspectionInterval}
          value={inspectionInterval}
        />
      </View>
      <View style={{ marginVertical: 30 }}>
        <MainButton
          title="Add technical specifications"
          bgColor="orange"
          event={nextForm}
          my={5}
        />
        <MainButton
          title="Add more information later"
          bgColor="lightGrey"
          event={() =>
            handleSubmitForm({
              nickname,
              brand,
              model,
              year,
              licensePlate,
              color: chosenColor,
              lastApprovedInspection,
              inspectionInterval,
              inTraffic,
            })
          }
          my={5}
        />
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
