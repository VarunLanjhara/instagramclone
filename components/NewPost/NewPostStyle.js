import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: StatusBar.currentHeight,
    marginLeft: 10,
    marginRight: 10,
  },
  newpost: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginLeft: 34,
  },
  userimage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 100,
  },
  mainstuff: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 20,
  },
  inputboihahaha: {
    color: "white",
    marginLeft: 10,
    paddingLeft: 7,
    width: 180,
    bottom: 19,
    // backgroundColor: "red",
    height: 100,
  },
});

export default styles;
