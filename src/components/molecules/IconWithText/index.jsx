import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import RegularText from "../../atoms/RegularText";
import theme from "../../theme";

const { colors } = theme;

const Icons = {
  power: require("../../../../assets/icons/speed_icon.png"),
  mileage: require("../../../../assets/icons/directions_car.png"),
  nextInspection: require("../../../../assets/icons/select_check_box.png"),
};
const RenderIcon = (icon) => {
  return <Image style={styles({ isMiddle: false })} source={Icons[icon]} />;
};

const IconWithText = ({ icon, text, isMiddle }) => {
  return (
    <View style={styles({ isMiddle }).container}>
      {RenderIcon(icon)}
      <RegularText margin={0}>{text}</RegularText>
    </View>
  );
};

const styles = ({ isMiddle }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      borderLeftWidth: isMiddle ? 1 : 0,
      borderRightWidth: isMiddle ? 1 : 0,
      borderColor: colors.grey,
    },
    image: {
      width: 40,
      height: 40,
    },
  });

export default IconWithText;
