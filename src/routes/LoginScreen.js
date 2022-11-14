import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import SignForm from "../components/molecules/SignForm";
import { getUser } from "../utils/api";

export default function LoginScreen({ navigation }) {
  const [formType, setFormType] = useState("login");

  useEffect(() => {
    getUser().then((res) => {
      if (res.data.user) {
        navigation.navigate("Home");
      }
    });
  }, []);
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        style={styles.background}
        source={require("../../assets/car-unsplash.jpg")}
      >
        <SignForm
          navigation={navigation}
          type={formType}
          setType={setFormType}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
  },
  background: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
