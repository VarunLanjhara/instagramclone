import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { db, firebase } from "../../firebase";
import SkeletonContent from "react-native-skeleton-content";
import { useNavigation } from "@react-navigation/core";

const ShowStories = ({ route }) => {
  const navigation = useNavigation();
  const { story } = route.params;
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 4000);
  }, []);
  console.log(story);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: story }}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

export default ShowStories;
