import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, Image, StatusBar } from "react-native";
import BottomTab from "./BottomTab";
import styles from "./BottomTabStyle";
import { Divider } from "react-native-elements/dist/divider/Divider";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { db, firebase } from "../../firebase";

const Activity = () => {
  //   const { post } = route.params;
  const [activettab, setactivetab] = useState("Heart");
  const navigation = useNavigation();
  console.log(activettab);
  const homeredirect = () => {
    setactivetab("Home");
    navigation.navigate("Home");
  };

  useEffect(() => {
    db.collectionGroup("posts");
  });

  const profileredirect = () => {
    setactivetab("Profile");
    navigation.navigate("Profile");
  };

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 19,
          textAlign: "center",
          marginTop: StatusBar.currentHeight,
        }}
      >
        No Activites Yet :(
      </Text>

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
          <TouchableHighlight onPress={() => setactivetab("Heart")}>
            {activettab === "Heart" ? (
              <AntDesign name='heart' size={24} color='white' /> || (
                <AntDesign name='heart' size={24} />
              )
            ) : (
              <AntDesign name='hearto' size={24} color='white' />
            )}
          </TouchableHighlight>
          <TouchableHighlight onPress={profileredirect}>
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
    </View>
  );
};

export default Activity;
