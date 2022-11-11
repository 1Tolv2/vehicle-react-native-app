import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import InputField from "../../atoms/InputField";
import MainButton from "../../atoms/MainButton";
import RadioButton from "../../atoms/RadioButton";
import RegularText from "../../atoms/RegularText";
import { registerUser, loginUser } from "../../../utils/api";

import theme from "../../theme";

const { colors } = theme;

const SignForm = ({ type, setType, navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState("sv");
  const [units, setUnits] = useState("Metric");
  const [errorMessage, setErrorMessage] = useState(null);

  const submitForm = async () => {
    if (type === "register") {
      try {
        const res = await registerUser(username, password, { language, units });
        if (res.status === 201) {
          setType("login");
          setConfirmPassword("");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (type === "login") {
      try {
        const res = await loginUser(username, password);
        res.status === 200 && navigation.navigate("Home");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleOnPress = async () => {
    setErrorMessage("");
    if (type === "login") {
      if (username !== "" && password !== "") {
        await submitForm();
      } else {
        setErrorMessage("Please fill in all fields");
      }
    } else if (type === "register") {
      if (
        username !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword
      ) {
        await submitForm();
      } else if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
      } else {
        setErrorMessage("Please fill in all fields");
      }
    }
  };

  const handleFormSwitch = () => {
    if (type === "login") {
      setType("register");
    } else {
      setType("login");
    }
    setErrorMessage("");
  };

  return (
    <View style={styles(language, type).container}>
      <ScrollView>
        <InputField
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <InputField
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />

        {type === "register" && (
          <>
            <InputField
              placeholder="Confirm password"
              setValue={setConfirmPassword}
            />
            <View style={styles().languageContainer}>
              <TouchableHighlight
                underlayColor="white"
                style={styles(language === "sv").imageContainer}
                onPress={() => {
                  setLanguage("sv");
                }}
              >
                <Text style={styles().image}>&#127468;&#127463;</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="white"
                style={styles(language === "en").imageContainer}
                onPress={() => {
                  setLanguage("en");
                }}
              >
                <Text style={styles().image}>&#127480;&#127466;</Text>
              </TouchableHighlight>
            </View>
            <View style={styles().radioButtons}>
              <RadioButton
                multiple
                label="Metric"
                setValue={setUnits}
                value={units}
              />
              <RadioButton
                multiple
                label="Imperial"
                setValue={setUnits}
                value={units}
              />
            </View>
          </>
        )}
        {errorMessage && (
          <RegularText color="cancel">{errorMessage}</RegularText>
        )}
        <MainButton
          title={type === "register" ? "Register" : "Log in"}
          bgColor="orange"
          event={handleOnPress}
        />
        <View style={styles.textWrapper}>
          <RegularText align="center">
            {type === "login"
              ? "Don't have an account? "
              : "Already have an account? "}

            <RegularText
              fontWeight="bold"
              align="center"
              onPress={handleFormSwitch}
            >
              {type === "login" ? "Register " : "Log in"}
            </RegularText>
          </RegularText>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (language, type) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: type === "register" ? "70%" : "50%",
      backgroundColor: colors.white,
      paddingTop: 40,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 40,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    textWrapper: {
      flex: 1,
    },
    languageContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 10,
      marginBottom: 10,
    },
    imageContainer: {
      width: "45%",
      height: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottomColor: language ? colors.confirm : colors.white,
      borderBottomWidth: 2,
      opacity: language ? 1 : 0.3,
    },
    image: {
      paddingTop: 12,
      width: 102,
      height: 102,
      fontSize: 80,
      lineHeight: 80,
    },
    radioButtons: {
      width: "100%",
      height: 90,
      flexDirection: "row",
    },
  });

export default SignForm;
