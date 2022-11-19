import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Heading from "../atoms/Heading";
import RegularText from "../atoms/RegularText";
import IconButton from "./IconButton";
import theme from "../theme";

const { colors } = theme;

const VehicleIdentityArea = ({ vehicle, navigate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading type="h1" align="center">
          {vehicle.nickname
            ? `"${vehicle.nickname}"`
            : vehicle.type === 1
            ? "Motorcycle"
            : "Car"}
        </Heading>
        <View style={styles.preamble}>
          <RegularText align="left">{vehicle.registrationNumber}</RegularText>
          <IconButton
            icon="edit"
            size={60}
            event={() => navigate("AddVehicle", { data: vehicle })}
          />
        </View>
      </View>
      <Image
        style={styles.image}
        source={
          vehicle.vehicleType === 1
            ? require("../../../assets/icons/directions_car.png")
            : require("../../../assets/icons/motorcycle_filled.png")
        }
      />
      <View style={styles.content}>
        <Heading type="h4">{vehicle.brand}</Heading>
        {vehicle.model && (
          <Heading type="h3">{`${vehicle.model} ${
            vehicle.year || ""
          }`}</Heading>
        )}
        <RegularText>
          In traffic: {vehicle.inTraffic ? <>&#9989;</> : <>&#10060;</>}
        </RegularText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    backgroundColor: colors.white,
    paddingBottom: 10,
  },
  preamble: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 20,
  },
  header: {
    marginTop: 20,
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginVertical: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
});

export default VehicleIdentityArea;
