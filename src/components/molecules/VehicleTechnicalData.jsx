import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../atoms/Heading";
import RegularText from "../atoms/RegularText";
import theme from "../theme";
import { getUser } from "../../utils/api";

const { colors } = theme;

const renderFormattedValue = (key, value, userUnits) => {
  switch (key) {
    case "mileage":
      return `${value} ${userUnits === "imperial" ? "mi" : "mil"}`;
    case "size":
      return `${value} ${value > 40 ? "cc" : "l"}`;
    case "fuel-consumption":
      return `${value} ${userUnits === "imperial" ? "MPG" : "l/100km"}`;
    case "fuel-capacity":
      return `${value} ${userUnits === "imperial" ? "gal" : "l"}`;
    case "power":
      return `${value} kW / ${Math.round(value * 1.341)} hp`;

    default:
      return value;
  }
};
const translateToSwedish = (string) => {
  switch (string) {
    case "Size":
      return "Slagvolym";
    case "Type":
      return "Modell";
    case "Power":
      return "Effekt";
    case "Mileage":
      return "Miltal";
    case "Fuel Type":
      return "Bränsle";
    case "Fuel Capacity":
      return "Bränslekapacitet";
    case "Fuel Consumption":
      return "Bränsleförbrukning";
    case "Gearbox":
      return "Växellåda";
    default:
      return string;
  }
};
const upperCaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const loopThroughObject = (object, array, userUnits, language) => {
  Object.entries(object).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      loopThroughObject(value, array, userUnits, language);
    } else {
      value
        ? array.push(
            <View style={styles.gridItem} key={key}>
              <Heading color="darkGrey">
                {language === "sv"
                  ? translateToSwedish(
                      upperCaseFirstLetter(key).replace("-", " ")
                    )
                  : upperCaseFirstLetter(key).replace("-", " ")}
              </Heading>
              <RegularText margin={5}>
                {renderFormattedValue(key, value, userUnits) || "N/A"}
              </RegularText>
            </View>
          )
        : null;
    }
  });
};

const renderData = (technicalData, userUnits, language) => {
  const dataToRender = [];
  loopThroughObject(technicalData, dataToRender, userUnits, language);
  return dataToRender;
};

const VehicleTechnicalData = ({ vehicle, userSettings, setUserSettings }) => {
  const technicalData = {
    engine: {
      size: vehicle.modelSpecification?.engine?.size,
      type: vehicle.modelSpecification?.engine?.model,
      power: vehicle.modelSpecification?.engine?.powerKW,
    },
    mileage: vehicle.mileage,
    fuel: {
      "fuel-type": vehicle.modelSpecification?.engine?.fuelType,
      "fuel-capacity": vehicle.modelSpecification?.engine?.fuelCapacity,
      "fuel-consumption": vehicle.modelSpecification?.fuelConsumption,
    },
    gearbox: vehicle.modelSpecification?.gearBox?.type,
  };
  return (
    <View style={styles.container}>
      <Heading type="h3" color="orange">
        {userSettings?.language === "sv" ? "Teknisk data" : "Technical Data"}
      </Heading>
      <Heading type="h4">
        {userSettings?.language === "sv" ? "Motor" : "Engine"}
      </Heading>
      {userSettings && (
        <View style={styles.grid}>
          {renderData(
            technicalData,
            userSettings?.units,
            userSettings?.language
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    width: "100%",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  gridItem: {
    width: "50%",
    marginTop: 10,
  },
});

export default VehicleTechnicalData;
