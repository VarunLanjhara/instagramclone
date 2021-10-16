import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { firebase, db } from "../../firebase";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setemail] = useState("");
  const ehehehh = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((bruh) => {
        Alert.alert("Succesfull", `Link sent to ${email}`, [
          {
            text: "Ok",
            onPress: navigation.navigate("Login"),
          },
        ]);
      })
      .catch((err) => {
        Alert.alert("Error Occured", `No user found with ${email}`, [
          {
            text: "Ok",
          },
        ]);
      });
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView
        style={{ justifyContent: "center", alignItems: "center" }}
        behavior='padding'
      >
        <Image
          source={require("../../assets/lockimage.png")}
          style={{
            width: 200,
            height: 200,
            resizeMode: "contain",
            bottom: 100,
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 18, bottom: 90 }}>
          Trouble with logging in?
        </Text>
        <Text
          style={{
            color: "#c2c2c2",
            fontWeight: "500",
            marginRight: 40,
            marginLeft: 40,
            bottom: 80,
          }}
        >
          Enter your email address and we'll send you a link to get back into
          your account.
        </Text>
        <TextInput
          style={{
            width: 300,
            height: 48,
            borderColor: "#eaeaea",
            borderWidth: 2,
            borderRadius: 7,
            backgroundColor: "#fafafa",
            paddingLeft: 10,
            bottom: 50,
          }}
          placeholder='Enter Email'
          onChangeText={(value) => setemail(value)}
        />
        {email.includes("@") ? (
          <TouchableHighlight
            style={{
              width: 300,
              height: 48,
              backgroundColor: "#0095f6",
              bottom: 20,
              borderRadius: 7,
              justifyContent: "center",
              alignItems: "center",
            }}
            underlayColor='#0095f6'
            onPress={ehehehh}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              Send Login LInk
            </Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            style={{
              width: 300,
              height: 48,
              backgroundColor: "#0095f6",
              bottom: 20,
              borderRadius: 7,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.4,
            }}
            underlayColor='#0095f6'
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              Send Login Link
            </Text>
          </TouchableHighlight>
        )}
      </KeyboardAvoidingView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#fafafa",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Back To Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
