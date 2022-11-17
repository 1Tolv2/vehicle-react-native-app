import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import theme from "../theme";
import RegularText from "../atoms/RegularText";

const { colors } = theme;

const ImageInput = ({ title, data, setValue, stateValue, name }) => {
  return (
    <View style={styles(0).container}>
      <RegularText fontWeight="bold" size={20} fullWidth>
        {title}
      </RegularText>
      {data.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={
              styles(data, stateValue === item.value, item.color).itemContainer
            }
            onPress={() => setValue(item.value, name)}
          >
            {item.icon && <Image style={styles(0).image} source={item.icon} />}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = (data, active, bgColor) => {
  const windowWidth = Dimensions.get("window").width;
  const itemWidth =
    data.length > 6 ? windowWidth / 6 - 20 : windowWidth / data.length - 20;

  return StyleSheet.create({
    container: {
      displat: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      width: "100%",
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
    },
    itemContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: itemWidth,
      height: itemWidth,
      marginTop: 15,
      marginBottom: 15,
      marginHorizontal: 5,
      backgroundColor: bgColor || colors.white,
      borderColor: bgColor === "white" ? colors.darkGrey : bgColor,
      borderWidth: 2,
      opacity: active ? 0.3 : 1,
    },
    image: {
      paddingTop: 12,
      width: "50%",
      height: "50%",
      fontSize: 80,
      lineHeight: 80,
    },
  });
};

export default ImageInput;
