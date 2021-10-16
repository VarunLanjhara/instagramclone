import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  headerstuff: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default styles;
