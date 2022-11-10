import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/routes/LoginScreen";
import RegisterScreen from "./src/routes/RegisterScreen";
import AddVehicleScreen from "./src/routes/AddVehicleScreen";
import VehicleDetailScreen from "./src/routes/VehicleDetailScreen";
import HomeScreen from "./src/routes/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
