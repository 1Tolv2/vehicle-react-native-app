import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../theme";

const { colors } = theme;

const Heading = ({ children, size, align, type }) => {
  return (
    <Text
      style={styles(align, size)[type || "defaultText"]}
      type={type}
      size={size}
      align={align}
    >
      {children}
    </Text>
  );
};

const styles = (align, size) =>
  StyleSheet.create({
    defaultText: {
      color: colors.black,
      textAlign: align || "left",
      fontSize: size || 20,
    },
    h1: {
      color: colors.black,
      textAlign: align || "left",
      fontSize: 40,
      fontWeight: "bold",
    },
    h2: {
      color: colors.black,
      textAlign: align || "left",
      fontSize: 30,
    },
    h3: {
      color: colors.black,
      textAlign: align || "left",
      fontSize: 26,
      fontWeight: "bold",
    },
    h4: {
      color: colors.black,
      textAlign: align || "left",
      fontSize: 22,
    },
  });

// const headings = {
//   h1: css`
//     font-size: 40px;
//     font-weight: bold;
//   `,
//   h2: css`
//     font-size: 30px;
//   `,
//   h3: css`
//     font-size: 26px;
//     font-weight: bold;
//   `,
//   h4: css`
//     font-size: 22px;
//   `,
// };

export default Heading;
