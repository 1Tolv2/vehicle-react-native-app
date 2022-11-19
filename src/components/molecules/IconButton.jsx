import { View, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import theme from "../theme";

const { colors } = theme;

const Icons = {
  edit: require("../../../assets/icons/add.png"),
  add: require("../../../assets/icons/add.png"),
  write: require("../../../assets/icons/add.png"),
};
const renderIcon = (icon) => {
  return <Image style={styles({ size: null }).image} source={Icons[icon]} />;
};

const IconButton = ({ icon, size, event }) => {
  return (
    <Pressable style={styles({ size: size || 50 }).container} onPress={event}>
      {renderIcon(icon)}
    </Pressable>
  );
};

const styles = ({ size }) =>
  StyleSheet.create({
    container: {
      position: "relative",
      width: size,
      height: size,
      backgroundColor: colors.orange,
      alignSelf: "flex-end",
      borderRadius: size,
      paddingHorizontal: 5,
      paddingVertical: 5,
      zIndex: 1,
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      marginHorizontal: 5,
      marginVertical: 5,
    },
  });

export default IconButton;
