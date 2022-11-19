import { View, StyleSheet } from "react-native";
import React from "react";
import Heading from "../atoms/Heading";
import RegularText from "../atoms/RegularText";
import theme from "../theme";

const { colors } = theme;

const formatDate = (date) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

const VehicleInspectionData = ({ vehicle, userSettings }) => {
  const lastInspection = new Date(
    vehicle?.specifications?.inspection?.lastInspection
  );
  return (
    <View style={styles.container}>
      <Heading type="h3" color="orange">
        {userSettings?.language === "sv" ? "Besktining" : "Inspection"}
      </Heading>
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Heading color="darkGrey">
            {userSettings?.language === "sv"
              ? "Senast godkänd"
              : "Last approved"}
          </Heading>
          <RegularText margin={5}>{formatDate(lastInspection)}</RegularText>
        </View>
        <View style={styles.gridItem}>
          <Heading color="darkGrey">
            {userSettings?.language === "sv"
              ? "Besiktiga innan"
              : "Inspection before"}
          </Heading>
          <RegularText margin={5}>
            {formatDate(
              lastInspection.setMonth(lastInspection.getMonth() + 14)
            )}
          </RegularText>
        </View>
      </View>
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

export default VehicleInspectionData;
