import { StyleSheet } from "react-native";

const styless = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  stuff: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    marginLeft: 10,
  },
  userpfpfstuff: {
    marginTop: 30,
  },
  userpfp: {
    resizeMode: "contain",
    width: 70,
    height: 70,
    borderRadius: 10000,
  },
  userpostsstuff: {
    marginTop: 50,
  },
  userfollowersstuff: {
    marginTop: 50,
  },
  userfollowingstuff: {
    marginTop: 50,
  },
});

export default styless;
