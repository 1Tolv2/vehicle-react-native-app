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
    },
    h1: {
      color: colors[color],
      textAlign: align || "left",
      fontSize: 35,
      fontWeight: "bold",
    },
    h2: {
      color: colors[color],
      textAlign: align || "left",
      fontSize: 30,
    },
    h3: {
      color: colors[color],
      textAlign: align || "left",
      fontSize: 26,
      fontWeight: "bold",
    },
    h4: {
      color: colors[color],
      textAlign: align || "left",
      fontSize: 22,
    },
  });

export default Heading;
