import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { db, firebase } from "../../firebase";
import { Feather } from "@expo/vector-icons";

const MessageScreen = () => {
  const navigation = useNavigation();
  const [users, setusers] = useState([]);

  const getcurrentbois = () => {
    db.collection("users").onSnapshot((snapshot) => {
      setusers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  useEffect(() => {
    getcurrentbois();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          marginLeft: 20,
          marginRight: 20,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={32} color='white' />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontWeight: "bold",
            top: 3,
            left: 19,
          }}
        >
          {firebase.auth().currentUser.displayName
            ? firebase.auth().currentUser.displayName
            : firebase.auth().currentUser.email}
        </Text>
      </View>
      <ScrollView>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
            marginTop: 14,
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          Oopps you have no friends to chat with
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            left: 24,
            marginTop: 8,
          }}
        >
          Suggestions
        </Text>
        {users.map((user, index) => (
          <View
            style={{
              flexDirection: "row",
              marginLeft: 14,
              marginRight: 14,
              marginTop: 26,
            }}
          >
            <Image
              source={{ uri: user.profile_pic }}
              style={{ width: 50, height: 50, borderRadius: 1000 }}
            />
            <Text style={{ color: "white", top: 14, left: 6 }}>
              {user.username}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MessageScreen;
