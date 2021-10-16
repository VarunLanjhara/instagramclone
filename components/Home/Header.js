import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./HeaderStyle";
import { AntDesign } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { firebase } from "../../firebase";

const Header = ({ scrolltoptop }) => {
  const navigation = useNavigation();
  const movetonewpost = () => {
    navigation.navigate("NewPost");
  };

  const signout = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrolltoptop}>
        <Image
          source={require("../../assets/insta-logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.iconcontainer}>
        <TouchableOpacity onPress={movetonewpost}>
          <AntDesign
            name='plussquareo'
            size={24}
            color='white'
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={signout}>
          <AntDesign
            name='hearto'
            size={24}
            color='white'
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MessageScreen")}>
          <Badge
            status='error'
            value='69'
            containerStyle={{
              position: "absolute",
              left: 28,
              zIndex: 100,
              bottom: 13,
              borderColor: null,
            }}
          />
          <AntDesign
            name='message1'
            size={24}
            color='white'
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
