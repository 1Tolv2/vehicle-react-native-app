import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../theme";

const { colors } = theme;

const LabelText = ({ children, align, color, onPress }) => {
  return (
    <Text
      onPress={onPress}
      style={
        styles({
          align: align ? align : "left",
          color: color ? colors[color] : colors.darkerGrey,
        }).text
      }
    >
      {children}
    </Text>
  );
};

const styles = ({ align, color }) =>
  StyleSheet.create({
    text: {
      width: "100%",
      color: color,
      textAlign: align,
      marginVertical: 5,
      marginHorizontal: 5,
      fontSize: 18,
      fontWeight: "bold",
    },
  });

export default LabelText;
