import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 34,
    resizeMode: "contain",
    right: 25,
  },
  container: {
    marginTop: StatusBar.currentHeight,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 50,
    height: 49,
  },
  iconcontainer: {
    display: "flex",
    flexDirection: "row",
  },
  icons: {
    marginLeft: 23,
    alignItems: "center",
  },
});

export default styles;
