import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import theme from "../theme/index";

const { colors } = theme;

const renderColor = (bgColor, brandColor) => {
  if (typeof brandColor !== "undefined") {
    return colors.modelSpecific.hasOwnProperty(brandColor.toLowerCase())
      ? colors.modelSpecific[brandColor.toLowerCase()].primary
      : colors.modelSpecific["default"].primary;
  } else if (bgColor !== "undefined") return colors[bgColor];
  else return null;
};

const MainButton = ({ type, title, event, bgColor, brandColor, disabled }) => {
  return (
    <>
      {type === "outlined" ? (
        <Pressable
          style={styles({ bgColor, fill: false }).container}
          onPress={event}
          type={type}
          bgColor={disabled ? "lightgrey" : renderColor(bgColor, brandColor)}
        >
          <Text style={styles({ fill: false }).text}>{title}</Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles({ bgColor, fill: true }).container}
          onPress={event}
          type={type}
          bgColor={disabled ? "lightgrey" : renderColor(bgColor, brandColor)}
        >
          <Text style={styles({ fill: true }).text}>{title}</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = ({ bgColor, fill }) =>
  StyleSheet.create({
    container: {
      marginVertical: 20,
      marginHorizontal: 0,
      paddingHorizontal: 5,
      paddingTop: 10,
      paddingBottom: 12,
      borderRadius: 10,
      width: "100%",
      backgroundColor: fill ? colors[bgColor] : "transparent",
      borderColor: colors[bgColor],
      borderWidth: fill ? 0 : 1,
    },
    text: {
      textAlign: "center",
      color: fill ? colors.white : colors[bgColor],
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default MainButton;
