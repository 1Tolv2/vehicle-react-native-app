import React from "react";
import { Pressable, Text, StyleSheet, TextInput } from "react-native";
import theme from "../theme/index";

const { colors } = theme;

const InputField = ({ placeholder, value, setValue }) => {
  return (
    <TextInput
      style={StyledInput}
      placeholder={placeholder}
      value={value}
      onChangeText={(e) => {
        setValue(e);
      }}
    />
  );
};

const StyledInput = StyleSheet.create({
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 15,
  paddingRight: 15,
  marginTop: 10,
  marginBottom: 10,
  borderRadius: 5,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: colors.lightGrey,
});

export default InputField;
