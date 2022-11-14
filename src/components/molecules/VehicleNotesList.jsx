import { View, StyleSheet } from "react-native";
import React from "react";
import Heading from "../atoms/Heading";
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

const VehicleNotesList = () => {
  return (
    <View style={styles.container}>
      <Heading type="h3" color="orange">
        Notes
      </Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    backgroundColor: colors.white,
    paddingBottom: 10,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  header: {
    marginTop: 20,
  },
});

export default VehicleNotesList;
