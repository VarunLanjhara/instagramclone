import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./EditProfileStyle";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const EditProfile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerstuff}>
        <TouchableOpacity
          style={{ left: 20 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='close' size={24} color='white' />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          Edit Profile
        </Text>
        <TouchableOpacity style={{ right: 20 }}>
          <AntDesign name='check' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
