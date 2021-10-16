import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import styles from "./BottomTabStyle";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase, db } from "../../firebase";
import { useNavigation } from "@react-navigation/core";

const BottomTab = ({ post }) => {
  const navigation = useNavigation();
  const profilehaha = () => {
    navigation.navigate("Profile");
  };

  const [activettab, setactivetab] = useState("Home");
  console.log(activettab);
  const activityboi = () => {
    // setactivetab("Heart");
    navigation.navigate("Activity", { post });
  };
  return (
    <View style={styles.wraper}>
      <Divider width={1} orientation='vertical' color='#eee' />
      <View style={styles.container}>
        <TouchableHighlight onPress={() => setactivetab("Home")}>
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
        <TouchableHighlight onPress={profilehaha}>
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
  );
};

export default BottomTab;
