import React from "react";
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const NewScreenUser = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("../../assets/insta-logo-black.png")}
        style={{ width: 200, height: 200, resizeMode: "contain", bottom: 30 }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#0095f6",
          height: 50,
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          bottom: 40,
        }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Create New Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, bottom: 40 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "#0095f6", fontWeight: "bold" }}>Log in</Text>
      </TouchableOpacity>
      <StatusBar hidden />
    </View>
  );
};

export default NewScreenUser;
