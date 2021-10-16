import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  headerstuff: {
    width: "100%",
    height: 30,
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  user_pfp: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 100,
    top: 27,
    marginLeft: 17,
  },
  lastdiv: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
  },
  input: {
    width: 240,
    height: 48,
    borderWidth: 2,
    borderRadius: 7,
    paddingLeft: 10,
    marginTop: 20,
    color: "white",
    marginLeft: 8,
  },
  commentboi: {
    width: "80%",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    marginRight: 19,
  },
  pfp_commentboi: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});

export default styles;
