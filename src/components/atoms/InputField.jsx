import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import theme from "../theme/index";
import LabelText from "./LabelText";
import RegularText from "./RegularText";
import ErrorText from "./ErrorText";

const { colors } = theme;

const InputField = ({
  label,
  placeholder,
  value,
  setValue,
  keyboardType,
  name,
  unit,
  required,
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
          {required && <ErrorText>*</ErrorText>}
        </LabelText>
      )}
      <View style={styles.container}>
        {typeof value === "object" && value !== null ? (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={(e) => {
              setValue(e);
            }}
            keyboardType={keyboardType}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={(e) => {
              setValue(e, name);
            }}
            keyboardType={keyboardType}
          />
        )}
        {unit && <RegularText>{unit}</RegularText>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
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
    flex: 1,
  },
  container: {
    flexDirection: "row",
  },
});

export default InputField;
