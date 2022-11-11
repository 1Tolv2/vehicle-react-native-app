import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../theme";

const { colors } = theme;

const RegularText = ({
  children,
  size,
  align,
  margin,
  fontStyle,
  color,
  fontWeight,
  onPress,
}) => {
  return (
    <Text
      onPress={onPress}
      style={
        styles({
          size: size ? size : 16,
          align: align ? align : "left",
          margin: margin ? margin : 20,
          fontStyle: fontStyle ? fontStyle : "normal",
          color: color ? colors[color] : "black",
          fontWeight: fontWeight ? fontWeight : "normal",
        }).text
      }
    >
      {children}
    </Text>
  );
};

const styles = ({ size, align, margin, fontStyle, color, fontWeight }) =>
  StyleSheet.create({
    text: {
      color: color,
      textAlign: align,
      marginVertical: margin,
      marginHorizontal: margin,
      fontSize: size,
      fontStyle,
      fontWeight,
    },
  });

export default RegularText;
