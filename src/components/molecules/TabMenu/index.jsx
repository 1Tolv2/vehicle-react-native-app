import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import theme from "../../theme";

const { colors } = theme;

const TabMenu = ({ navigate }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.image}
            source={require("../../../../assets/icons/motorcycle_filled.png")}
          />
        </View>
        <Pressable
          style={styles.centerIcon}
          onPress={() => navigate("AddVehicle")}
        >
          <Image
            style={styles.image}
            source={require("../../../../assets/icons/add.png")}
          />
        </Pressable>
        <Pressable
          style={styles.iconContainer}
          onPress={() => navigate("AppSettings")}
        >
          <Image
            style={styles.image}
            source={require("../../../../assets/icons/settings_filled.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.white,
    maxHeight: 60,
    elevation: 4,
  },
  centerIcon: {
    position: "relative",
    top: -20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: colors.orange,
    elevation: 2,
  },
  iconContainer: {
    padding: 3,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  image: {
    width: 32,
    height: 32,
  },
});

// const IconContainer = styled.View`
//   padding: 3px;
//   border-bottom-width: 2px;
//   border-bottom-color: transparent;

//   ${(props) =>
//     props.active &&
//     css`
//       border-bottom-width: 2px;
//       border-bottom-color: orange;
//     `}
// `;

export default TabMenu;
