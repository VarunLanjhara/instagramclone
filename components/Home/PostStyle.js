import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
  },
  headercontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
  leftstuff: {
    display: "flex",
    flexDirection: "row",
  },
  headerpfp: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ff8501",
  },
  headeruser: {
    color: "white",
    fontSize: 14,
    left: 10,
    top: 12,
  },
  imagecontainer: {
    width: "100%",
    height: 390,
    marginTop: 10,
  },
  imageboi: {
    height: "100%",
    resizeMode: "cover",
  },
  iconstuff: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  leftsideicos: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  rightsideicons: {
    marginRight: 10,
  },
  icon: {
    marginLeft: 8,
    marginRight: 8,
  },
  likecounter: {
    color: "white",
    fontWeight: "bold",
  },
  likestuff: {
    marginLeft: 20,
    marginTop: 7,
  },
  caption_stuff: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 7,
    width: 320,
  },
  usercaption: {
    color: "white",
    fontWeight: "bold",
  },
  caption: {
    color: "white",
    marginRight: 20,
  },
  commenttext: {
    color: "#a3a3a3",
  },
  howmanycomments: {
    marginLeft: 20,
    marginTop: 7,
  },
  comment_stuff: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 7,
    width: 320,
  },
  usercomment: {
    color: "white",
    fontWeight: "bold",
  },
  usercommenttext: {
    color: "white",
    marginRight: 20,
  },
  dateago: {
    marginLeft: 20,
    marginTop: 8,
  },
  dateagotext: {
    color: "#a3a3a3",
    fontSize: 11,
  },
});

export default styles;
