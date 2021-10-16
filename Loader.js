import React from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { firebase } from "./firebase";
import { useNavigation } from "@react-navigation/core";

const Loader = () => {
  const navigation = useNavigation();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("NewScreenUser");
    }
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("./assets/icons/insta-logo.png")}
        style={{
          width: 200,
          height: 100,
          resizeMode: "contain",
          marginBottom: 60,
        }}
      />
      <StatusBar hidden />
    </View>
  );
};

export default Loader;
