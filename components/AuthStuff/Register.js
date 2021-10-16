import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import styles from "./RegisterStyle";
import { useNavigation } from "@react-navigation/core";
import { HelperText } from "react-native-paper";
import { firebase, db } from "../../firebase";

const Register = () => {
  const navigation = useNavigation();
  const redirecttologin = () => {
    navigation.navigate("Login");
  };

  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const photoUrl =
    "https://p.kindpng.com/picc/s/24-248253_user-profile-default-image-png-clipart-png-download.png";

  const signup = async () => {
    try {
      const authuser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      navigation.navigate("Home");
      const email2 = authuser.user.email;
      const givenName = username;
      const id = authuser.user.uid;
      db.collection("users").doc(authuser.user.email).set({
        user_id: id,
        username: username,
        email: email,
        profile_pic: photoUrl,
      });
    } catch (err) {
      console.log(err);
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
        {email.includes("@") ? (
          <View>
            <TextInput
              style={styles.inputemailusername2}
              placeholder='Email'
              keyboardType='email-address'
              onChangeText={(value) => setemail(value)}
              value={email}
            />
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.inputemailusername}
              placeholder='Email'
              keyboardType='email-address'
              onChangeText={(value) => setemail(value)}
              value={email}
            />
            <HelperText type='error' visible={() => !email.includes("@")}>
              Email must be valid
            </HelperText>
          </View>
        )}
        {username.length >= 4 ? (
          <View>
            <TextInput
              style={styles.username2}
              placeholder='Username'
              onChangeText={(value) => setusername(value)}
              value={username}
            />
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.username}
              placeholder='Username'
              onChangeText={(value) => setusername(value)}
              value={username}
            />
            <HelperText type='error' visible={() => !username.length >= 4}>
              Username must contain 4 letters
            </HelperText>
          </View>
        )}
        {password.length >= 8 ? (
          <View>
            <TextInput
              style={styles.passwordinput2}
              secureTextEntry={true}
              placeholder='Password'
              onChangeText={(value) => setpassword(value)}
              value={password}
            />
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.passwordinput}
              secureTextEntry={true}
              placeholder='Password'
              onChangeText={(value) => setpassword(value)}
              value={password}
            />
            <HelperText type='error' visible={() => !password.length >= 8}>
              Password must contain 8 letters
            </HelperText>
          </View>
        )}

        {username.length >= 4 && email.includes("@") && password.length >= 8 ? (
          <TouchableHighlight
            style={styles.btn2}
            onPress={signup}
            underlayColor='#0095f6'
          >
            <Text style={styles.btntext}>Register</Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight style={styles.btn} underlayColor='#0095f6'>
            <Text style={styles.btntext}>Register</Text>
          </TouchableHighlight>
        )}
      </KeyboardAvoidingView>
      <View style={styles.bottomstuff}>
        <Text
          style={{
            color: "#9e9ebd",
          }}
        >
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={redirecttologin}>
          <Text style={{ color: "#1484d7" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden />
    </View>
  );
};

export default Register;
