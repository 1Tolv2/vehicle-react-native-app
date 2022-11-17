import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../theme";

const { colors } = theme;

const Heading = ({ children, color, size, align, type }) => {
  return (
    <Text
      style={
        styles(color || "black", align || "left", size)[type || "defaultText"]
      }
      type={type}
      size={size}
      align={align}
    >
      {children}
    </Text>
  );
};

const styles = (color, align, size) =>
  StyleSheet.create({
    defaultText: {
      color: colors[color],
      textAlign: align || "left",
      fontSize: size || 20,
      width: "100%",
    },
    h1: {
      color: colors[color],
      textAlign: align || "left",
      fontSize: 35,
      fontWeight: "bold",
      width: "100%",
    },
    h2: {
      color: colors[color],
      textAlign: align || "left",
      fontSize: 30,
      width: "100%",
    },
    h3: {
      color: colors[color],
      textAlign: align || "left",
      fontSize: 26,
      fontWeight: "bold",
      width: "100%",
    },
    h4: {
      color: colors[color],
      textAlign: align || "left",
      fontSize: 22,
      width: "100%",
    },
  });

export default Heading;
