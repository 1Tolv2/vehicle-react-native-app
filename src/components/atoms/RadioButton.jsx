import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import RegularText from "./RegularText";
import theme from "../theme";

const { colors } = theme;

const RadioButton = ({ label, multiple, setValue, value, name }) => {
  return (
    <View style={styles().container}>
      {multiple ? (
        <Pressable
          style={styles(value === label).checkbox}
          onPress={() => {
            setValue(label, name);
          }}
        ></Pressable>
      ) : (
        <Pressable
          style={styles(value).checkbox}
          onPress={() => {
            setValue(!value, name);
          }}
        ></Pressable>
      )}
      <View styles={styles().textContainer}>
        <RegularText>{label}</RegularText>
      </View>
    </View>
  );
};

const styles = (isChecked) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      marginVertical: 10,
      marginHorizontal: 0,
      paddingVertical: 0,
      paddingHorizontal: 15,
    },
    checkbox: {
      width: 25,
      height: 25,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      backgroundColor: isChecked ? colors.black : "transparent",
    },
    textContainer: {
      height: 23,
      marginLeft: 10,
    },
  });

export default RadioButton;
