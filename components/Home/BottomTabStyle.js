import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
  wraper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#000",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    bottom: 2,
    alignItems: "center",
  },
  selectedimage: {
    width: 32,
    height: 32,
    borderRadius: 50,
    bottom: 2,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
});

export default styles;
