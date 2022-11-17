import React from "react";
import { Pressable, Text, StyleSheet, TextInput } from "react-native";
import theme from "../theme/index";
import LabelText from "./LabelText";
import RegularText from "./RegularText";

const { colors } = theme;

const InputField = ({
  label,
  placeholder,
  value,
  setValue,
  keyboardType,
  name,
}) => {
  return (
    <>
      {label && (
        <LabelText
          fontWeight="bold"
          size={18}
          color="darkerGrey"
          fullWidth
          margin={5}
        >
          {label}
        </LabelText>
      )}
      {typeof value === "object" && value !== null ? (
        <TextInput
          style={StyledInput}
          placeholder={placeholder}
          value={value}
          onChangeText={(e) => {
            setValue(e);
          }}
          keyboardType={keyboardType}
        />
      ) : (
        <TextInput
          style={StyledInput}
          placeholder={placeholder}
          value={value}
          onChangeText={(e) => {
            setValue(e, name);
          }}
          keyboardType={keyboardType}
        />
      )}
    </>
  );
};

const StyledInput = StyleSheet.create({
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 15,
  paddingRight: 15,
  marginBottom: 10,
  borderRadius: 5,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: colors.lightGrey,
});

export default InputField;
