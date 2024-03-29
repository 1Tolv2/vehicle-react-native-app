import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/routes/LoginScreen";
import AddVehicleScreen from "./src/routes/AddVehicleScreen";
import VehicleDetailScreen from "./src/routes/VehicleDetailScreen";
import HomeScreen from "./src/routes/HomeScreen";
import AppSettingsScreen from "./src/routes/AppSettingsScreen";
import React from "react";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Vehicle"
          options={{ headerShown: false }}
          component={VehicleDetailScreen}
        />
        <Stack.Screen
          name="AddVehicle"
          options={{ headerShown: false }}
          component={AddVehicleScreen}
        />
        <Stack.Screen
          name="AppSettings"
          options={{ headerShown: false }}
          component={AppSettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 250,
    display: "flex",
    zIndex: 5,
  },
  modalHeader: {
    marginVertical: "50%",
  },
  activationButton: {
    marginVertical: "50%",
  },
  checkBox: {
    backgroundColor: "#fff",
  },
});
