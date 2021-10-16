import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import BottomTab from "../Home/BottomTab";
import styless from "./ProfileStyle";
import { useNavigation } from "@react-navigation/core";
import { firebase, db } from "../../firebase";
import { Divider } from "react-native-elements/dist/divider/Divider";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "../Home/BottomTabStyle";

const Profile = () => {
  const [activettab, setactivetab] = useState("Profile");
  const navigation = useNavigation();
  const redirecttocreatepost = () => {
    navigation.navigate("NewPost");
  };

  const activityboi = () => {
    setactivetab("Heart");
    navigation.navigate("Activity");
  };

  const homeredirect = () => {
    setactivetab("Home");
    navigation.navigate("Home");
  };

  return (
    <View style={styless.container}>
      <View
        style={{
          flexDirection: "row",
          top: 15,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <TouchableOpacity style={{ right: 20 }} onPress={redirecttocreatepost}>
          <AntDesign name='plussquareo' size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name='menu-sharp' size={24} color='white' />
        </TouchableOpacity>
      </View>
      <View style={styless.stuff}>
        <View style={styless.userpfpfstuff}>
          <Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/1422644317676507136/EszIU9uI_400x400.jpg",
            }}
            style={styless.userpfp}
          />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              left: 14,
              top: 7,
              fontSize: 16,
            }}
          >
            {firebase.auth().currentUser.displayName
              ? firebase.auth().currentUser.displayName
              : firebase.auth().currentUser.email}
          </Text>
        </View>
        <View style={styless.userpostsstuff}>
          <Text style={{ color: "white", fontWeight: "bold" }}>0</Text>
          <Text style={{ color: "white", right: 10 }}>Posts</Text>
        </View>
        <View style={styless.userfollowersstuff}>
          <Text style={{ color: "white", fontWeight: "bold" }}>0</Text>
          <Text style={{ color: "white", right: 10 }}>Followers</Text>
        </View>
        <View style={styless.userfollowingstuff}>
          <Text style={{ color: "white", fontWeight: "bold" }}>0</Text>
          <Text style={{ color: "white", right: 10 }}>Following</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          height: 40,
          width: "90%",
          backgroundColor: "gray",
          left: 20,
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.wraper}>
        <Divider width={1} orientation='vertical' color='#eee' />
        <View style={styles.container}>
          <TouchableHighlight onPress={homeredirect}>
            {activettab === "Home" ? (
              <MaterialIcons name='home-filled' size={28} color='white' />
            ) : (
              <Image
                source={require("../../assets/icons/home-icon.png")}
                style={{ width: 28, height: 28 }}
              />
            )}
          </TouchableHighlight>
          <TouchableHighlight onPress={() => setactivetab("Search")}>
            {activettab === "Search" ? (
              <Ionicons name='ios-search' size={26} color='white' />
            ) : (
              <Ionicons name='search-outline' size={26} color='white' />
            )}
          </TouchableHighlight>
          <TouchableHighlight onPress={() => setactivetab("Reels")}>
            {activettab === "Reels" ? (
              <Image
                source={require("../../assets/icons/reels-filled.png")}
                style={{ height: 28, width: 28, alignItems: "center" }}
              />
            ) : (
              <Image
                source={require("../../assets/icons/insta-reels-icon.png")}
                style={{ height: 28, width: 28, alignItems: "center" }}
              />
            )}
          </TouchableHighlight>
          <TouchableHighlight onPress={activityboi}>
            {activettab === "Heart" ? (
              <AntDesign name='heart' size={24} color='white' /> || (
                <AntDesign name='heart' size={24} />
              )
            ) : (
              <AntDesign name='hearto' size={24} color='white' />
            )}
          </TouchableHighlight>
          <TouchableHighlight onPress={() => setactivetab("Profile")}>
            {activettab === "Profile" ? (
              <Image
                source={{
                  uri: "https://preview.redd.it/v8z0crk5gho71.png?width=640&crop=smart&auto=webp&s=8afbdf5f25c33718c810de00f40cb267ef9ae469",
                }}
                style={styles.selectedimage}
              />
            ) : (
              <Image
                source={{
                  uri: "https://preview.redd.it/v8z0crk5gho71.png?width=640&crop=smart&auto=webp&s=8afbdf5f25c33718c810de00f40cb267ef9ae469",
                }}
                style={styles.image}
              />
            )}
          </TouchableHighlight>
        </View>
      </View>

      <View>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontWeight: "bold",
            textAlign: "center",
            top: 50,
          }}
        >
          You have currently no posts :(
        </Text>
        <TouchableOpacity
          style={{ top: 70 }}
          onPress={() => navigation.navigate("NewPost")}
        >
          <Text
            style={{
              color: "#0079d3",
              fontWeight: "bold",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            Create Post
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar hidden />
    </View>
  );
};

export default Profile;
