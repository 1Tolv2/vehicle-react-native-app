import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Heading from "../components/atoms/Heading";
import LabelText from "../components/atoms/LabelText";
import MainButton from "../components/atoms/MainButton";
import { getUser, updateUser } from "../utils/api";
import RadioButton from "../components/atoms/RadioButton";

export default function AppSettingsScreen({ navigation }) {
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [userSettings, setUserSettings] = useState(null);

  const handleSettingsState = (value, name) => {
    console.log(value, name);
    setUserSettings({ ...userSettings, [name]: value });
  };

  useEffect(() => {
    getUser().then((res) => {
      if (res.data.user.settings.language === "sv") {
        setUserSettings({
          language: "Svenska",
          units:
            res.data.user.settings.units === "metric"
              ? "Metersystemet"
              : "Imperiala",
          darkmode: res.data.user.settings.darkmode,
        });
        setCurrentLanguage("sv");
      } else {
        setUserSettings({
          language: "English",
          units:
            res.data.user.settings.units === "metric" ? "Metric" : "Imperial",
          darkmode: res.data.user.settings.darkmode,
        });
        setCurrentLanguage("en");
      }
    });
  }, []);

  const handleSubmitSettings = async () => {
    await updateUser({
      language:
        userSettings.language === "Svenska" ||
        userSettings.language === "Swedish"
          ? "sv"
          : "en",
      units:
        userSettings.units === "Metersystemet" ||
        userSettings.units === "Metric"
          ? "metric"
          : "imperial",
      darkmode: userSettings.darkmode ? true : false,
    });
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        height: "100%",
        marginTop: 20,
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <Text>App Settings Screen</Text>
      {userSettings && (
        <>
          <LabelText>
            {currentLanguage === "sv" ? "Enheter" : "Units"}
          </LabelText>
          <View style={{ flexDirection: "row" }}>
            <RadioButton
              multiple
              name="units"
              label={currentLanguage === "sv" ? "Metersystemet" : "Metric"}
              setValue={handleSettingsState}
              value={userSettings?.units}
            />
            <RadioButton
              multiple
              name="units"
              label={currentLanguage === "sv" ? "Imperiala" : "Imperial"}
              setValue={handleSettingsState}
              value={userSettings?.units}
            />
          </View>
          <LabelText>
            {currentLanguage === "sv" ? "Mörktläge" : "Dark mode"}
          </LabelText>
          <View style={{ flexDirection: "row" }}>
            <RadioButton
              name="darkmode"
              label="On"
              setValue={handleSettingsState}
              value={userSettings?.darkmode}
            />
          </View>
          <LabelText>
            {currentLanguage === "sv" ? "Språk" : "Language"}
          </LabelText>
          <View style={{ flexDirection: "row" }}>
            <RadioButton
              multiple
              name="language"
              label={currentLanguage === "sv" ? "Svenska" : "Swedish"}
              setValue={handleSettingsState}
              value={userSettings?.language}
            />
            <RadioButton
              multiple
              name="language"
              label={currentLanguage === "sv" ? "Engelska" : "English"}
              setValue={handleSettingsState}
              value={userSettings?.language}
            />
          </View>
        </>
      )}
      <MainButton title="Save" event={handleSubmitSettings} bgColor="orange" />
    </View>
  );
}
