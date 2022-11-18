import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Heading from "../components/atoms/Heading";
import LabelText from "../components/atoms/LabelText";
import MainButton from "../components/atoms/MainButton";
import { getUser } from "../utils/api";
import RadioButton from "../components/atoms/RadioButton";

export default function AppSettingsScreen({ navigation }) {
  const [userSettings, setUserSettings] = useState(null);

  const handleSettingsState = (value, name) => {
    console.log(value, name);
    setUserSettings({ ...userSettings, [name]: value });
  };

  useEffect(() => {
    getUser().then((res) => {
      if (res.data.user.settings.language === "sv") {
        setUserSettings({
          language:
            res.data.user.settings.language === "sv" ? "Svenska" : "Engelska",
          units:
            res.data.user.settings.units === "metric"
              ? "Metersystemet"
              : "Imperiala",
        });
      } else {
        setUserSettings({
          language:
            res.data.user.settings.language === "sv" ? "Swedish" : "English",
          units:
            res.data.user.settings.units === "metric" ? "Metric" : "Imperial",
        });
      }
    });
  }, []);
  return (
    <View style={{ height: "100%", marginTop: 20, backgroundColor: "white" }}>
      <Text>App Settings Screen</Text>
      {userSettings && (
        <>
          <LabelText>
            {userSettings?.language === "Svenska" ? "Enheter" : "Units"}
          </LabelText>
          <View style={{ flexDirection: "row" }}>
            <RadioButton
              multiple
              name="language"
              label={
                userSettings?.language === "Svenska"
                  ? "Metersystemet"
                  : "Metric"
              }
              setValue={handleSettingsState}
              value={userSettings?.language}
            />
            <RadioButton
              multiple
              name="language"
              label={
                userSettings?.language === "Svenska"
                  ? "Imperialasystemet"
                  : "Imperial"
              }
              setValue={handleSettingsState}
              value={userSettings?.language}
            />
          </View>
          <LabelText>
            {userSettings?.language === "Svenska" ? "Mörktläge" : "Dark mode"}
          </LabelText>
          <View style={{ flexDirection: "row" }}>
            <RadioButton
              name="darkMode"
              label="On"
              setValue={handleSettingsState}
              value={userSettings?.darkMode}
            />
          </View>
          <LabelText>
            {userSettings?.language === "sv" ? "Språk" : "Language"}
          </LabelText>
          <View style={{ flexDirection: "row" }}>
            <RadioButton
              multiple
              name="language"
              label={
                userSettings?.language === "Svenska" ? "Svenska" : "Swedish"
              }
              setValue={handleSettingsState}
              value={userSettings?.language}
            />
            <RadioButton
              multiple
              name="language"
              label={
                userSettings?.language === "Svenska" ? "Engelska" : "English"
              }
              setValue={handleSettingsState}
              value={userSettings?.language}
            />
          </View>
        </>
      )}
      <MainButton title="Save" event={() => {}} bgColor="orange" />
    </View>
  );
}
