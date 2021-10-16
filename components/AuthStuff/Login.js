import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import { Divider } from "react-native-elements";
import styles from "./LoginStyle";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Platform } from "react-native";
import { firebase } from "../../firebase";
import * as Google from "expo-google-app-auth";
import { db } from "../../firebase";

const Login = () => {
  const navigation = useNavigation();
  const redirecttoregisterpage = () => {
    navigation.navigate("Register");
  };

  const handlegooglesigiin = async () => {
    const config = {
      androidClientId:
        "48783107785-op2mqelmom80icp3upbcbhmuicv4uobp.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    };
    await Google.logInAsync(config)
      .then((result) => {
        const { user } = result;
        if (result.type === "success") {
          const { email, givenName, id, photoUrl } = user;
          db.collection("users").doc(email).set({
            user_id: id,
            username: givenName,
            email: email,
            profile_pic: photoUrl,
          });
          navigation.navigate("Home");
          const credential = firebase.auth.GoogleAuthProvider.credential(
            result.idToken,
            result.accessToken
          );
          return firebase.auth().signInWithCredential(credential);
        }
        return Promise.reject();
      })
      .catch((err) => console.log(err));
  };

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const login = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Error in logging", err.message, [
        {
          text: "Try Again",
        },
        {
          text: "Sign Up",
          onPress: () => navigation.navigate("Register"),
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <Image
          source={require("../../assets/insta-logo-black.png")}
          style={styles.logo}
        />
        <TextInput
          style={styles.inputemailusername}
          placeholder='Email or username'
          onChangeText={(value) => setemail(value)}
          value={email}
        />
        <TextInput
          style={styles.passwordinput}
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(value) => setpassword(value)}
          value={password}
        />

        <TouchableOpacity
          style={{ marginTop: 5, top: 4, alignItems: "flex-end" }}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={{ color: "#0095f6" }}>Forgot Password?</Text>
        </TouchableOpacity>

        {email.length >= 1 && password.length >= 1 ? (
          <TouchableHighlight
            style={styles.btn2}
            onPress={login}
            underlayColor='#0095f6'
          >
            <Text style={styles.btntext}>Log in</Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight style={styles.btn} underlayColor='#0095f6'>
            <Text style={styles.btntext}>Log In</Text>
          </TouchableHighlight>
        )}
      </KeyboardAvoidingView>
      <Text
        style={{
          color: "#c4c4c5",
          fontWeight: "bold",
          fontSize: 16,
          marginTop: 19,
        }}
      >
        OR
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: 50,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/icons/google.png")}
          style={styles.googlelogo}
        />
        <TouchableOpacity onPress={handlegooglesigiin}>
          <Text style={styles.googleauth}>Login in with google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomstuff}>
        <Text
          style={{
            color: "#9e9ebd",
          }}
        >
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={redirecttoregisterpage}>
          <Text style={{ color: "#1484d7" }}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <StatusBar hidden />
    </View>
  );
};

export default Login;
