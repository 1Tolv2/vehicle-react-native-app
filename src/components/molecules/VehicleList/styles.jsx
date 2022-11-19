import { StyleSheet } from "react-native";
import theme from "../../theme";
const { colors } = theme;

export const styles = (active) =>
  StyleSheet.create({
    container: {
      elevation: 1,
      marginTop: 15,
    },
    list: {
      //   height: "100%",
      marginBottom: 80,
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
    filterContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "100%",
      marginBottom: 10,
    },
    filterItem: {
      marginLeft: 5,
      backgroundColor: active ? colors.lightGrey : colors.lightestGrey,
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
    filterImage: {
      width: 50,
      height: 50,
    },
  });
