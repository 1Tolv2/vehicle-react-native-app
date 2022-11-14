import { View, Text, Modal, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getUser } from "../../../utils/api";
import theme from "../../theme";
import Heading from "../../atoms/Heading";
import RegularText from "../../atoms/RegularText";
import MainButton from "../../atoms/MainButton";
import IconWithText from "../IconWithText";

const { colors } = theme;

const VehiclePreviewModal = ({ data, stateHandler, navigate }) => {
  const { isModalVisible, setIsModalVisible } = stateHandler;
  const [userSettings, setUserSettings] = useState(null);

  const navigateTo = () => {
    setIsModalVisible(false);
    navigate("Vehicle", { data });
  };

  useEffect(() => {
    getUser().then((res) => {
      setUserSettings(res.data?.user?.settings);
    });
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(!isModalVisible)}
    >
      <Pressable
        style={styles.wrapper}
        onPress={() => setIsModalVisible(!isModalVisible)}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={
                  data.vehicleType === 1
                    ? require("../../../../assets/icons/directions_car.png")
                    : require("../../../../assets/icons/motorcycle_filled.png")
                }
              />
            </View>
            <Heading type="h3">
              {data.brand} - {data.model}
            </Heading>
            {data.year && <RegularText margin={0}>{data.year}</RegularText>}
            <View style={styles.quickInfoContainer}>
              <IconWithText
                text={`${data.mileage || "N/A"} ${
                  userSettings?.units === "metric" ? "mil" : "miles"
                }`}
                icon="mileage"
              />
              <IconWithText
                isMiddle
                text={`${data.nextInspection || "N/A"}`}
                icon="nextInspection"
              />
              <IconWithText text={`${data.power || "N/A"} kw`} icon="power" />
            </View>
            <MainButton
              title="Go to vehicle"
              event={navigateTo}
              bgColor="orange"
            ></MainButton>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    position: "relative",
    backgroundColor: colors.white,
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 30,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 80,
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    top: -60,
    width: "100%",
  },
  image: {
    width: 180,
    height: 130,
  },
  quickInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default VehiclePreviewModal;
