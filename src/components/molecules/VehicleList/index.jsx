import { View, FlatList, Pressable, Image } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { getVehicles } from "../../../utils/api";
import RegularText from "../../atoms/RegularText";
import { styles } from "./styles";
import Heading from "../../atoms/Heading";

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

const VehicleList = ({ toggleModal, navigation, isFocused, userSettings }) => {
  const [vehicleData, dispatch] = useReducer(vehicleReducer, []);
  const [updateList, setUpdateList] = useState(false);
  const [activeSort, setActiveSort] = useState("");

  const getVehicleData = async () => {
    const res = await getVehicles();
    if (res.data.vehicles) {
      dispatch({ type: "replace", input: res.data.vehicles });
    } else if (res.data.error) {
      navigation.navigate("Login");
    }
  };

  const sortBy = (property) => {
    if (activeSort === property) {
      setActiveSort("");
      getVehicleData();
    } else {
      const sortedData = vehicleData.sort((a, b) => {
        return b[property] - a[property];
      });
      dispatch({
        type: "replace",
        input: sortedData,
      });
      setActiveSort(property);
    }
    setUpdateList(!updateList);
  };

  useEffect(() => {
    getVehicleData();
    // setUpdateList(!updateList);
  }, [isFocused]);

  return (
    <View style={styles().container}>
      <Heading type="h1" color="orange">
        {userSettings?.language === "sv" ? "Dina fordon" : "Your Vehicles"}
      </Heading>
      <View style={styles().filterContainer}>
        <Pressable
          onPress={() => sortBy("modelYear")}
          style={styles(activeSort === "modelYear").filterItem}
        >
          <Image
            style={styles().filterImage}
            source={require("../../../../assets/icons/event_note_fill.png")}
          />
        </Pressable>
        <Pressable
          onPress={() => sortBy("vehicleType")}
          style={styles(activeSort === "vehicleType").filterItem}
        >
          <Image
            style={styles().filterImage}
            source={require("../../../../assets/icons/transportation_fill.png")}
          />
        </Pressable>
      </View>
      <FlatList
        data={vehicleData}
        extraData={updateList}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles().listItem}
              onPress={() => toggleModal(item)}
            >
              <Image
                style={styles().image}
                source={
                  item.vehicleType === 1
                    ? require("../../../../assets/icons/directions_car.png")
                    : require("../../../../assets/icons/motorcycle_filled.png")
                }
              />
              <View>
                <RegularText align="left">
                  {item.nickname || item.brand + " " + item.model}
                </RegularText>
              </View>
              <View style={styles().arrow} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item._id}
        style={styles().list}
      />
    </View>
  );
};

export default VehicleList;
