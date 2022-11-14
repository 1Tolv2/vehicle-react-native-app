import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useReducer } from "react";
import RegularText from "../../atoms/RegularText";
import { getVehicles } from "../../../utils/api";
import theme from "../../theme";
const { colors } = theme;

const vehicleReducer = (state, action) => {
  if (!action.input) {
    return state;
  } else {
    if (action.type === "add") {
      return [...state, action.input];
    } else if (action.type === "remove") {
      return state.filter((item) => item._id !== action.input?._id);
    } else if (action.type === "replace") {
      return action.input;
    }
  }
};

const VehicleList = ({ toggleModal, navigation }) => {
  const [vehicleData, dispatch] = useReducer(vehicleReducer, []);

  const getVehicleData = async () => {
    const res = await getVehicles();
    console.log(res.data);
    if (res.data.vehicles) {
      dispatch({ type: "replace", input: res.data.vehicles });
    } else if (res.data.error) {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    getVehicleData();
  }, []);
  return (
    <View style={styles.container}>
      <RegularText>Your Vehicles</RegularText>
      <FlatList
        data={vehicleData}
        extraData={vehicleData}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.listItem}
              onPress={() => toggleModal(item)}
            >
              <Image
                style={styles.image}
                source={
                  item.vehicleType === 1
                    ? require("../../../../assets/icons/motorcycle_filled.png")
                    : require("../../../../assets/icons/directions_car.png")
                }
              />
              <View>
                <RegularText align="left">
                  {item.nickname || item.brand + " " + item.model}
                </RegularText>
              </View>
              <View style={styles.arrow} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  container: {
    elevation: 1,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 10,
  },
  image: {
    width: 75,
    height: 50,
  },
  text: { minWidth: "60%" },
  arrow: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    transform: [{ rotate: "45deg" }],
    margin: 10,
  },
});
