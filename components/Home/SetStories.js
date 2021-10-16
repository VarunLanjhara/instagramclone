import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { firebase, db } from "../../firebase";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

const SetStories = () => {
  const navigation = useNavigation();
  const [story, setstory] = useState(null);
  const [currentuser, setcurrentuser] = useState(false);
  const getcurrentuser = () => {
    const user = firebase.auth().currentUser;
    const unsibscribe = db
      .collection("users")
      .where("email", "==", user.email)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setcurrentuser({
            username: doc.data().username,
            profile_pic: doc.data().profile_pic,
          });
        })
      );
    return unsibscribe;
  };

  useEffect(() => {
    getcurrentuser();
    console.log(currentuser);
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setstory(result.uri);
      console.log(story);
    }
  };

  const submittofirestore = (downloadurl) => {
    db.collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("story")
      .add({
        story: downloadurl,
        user: currentuser,
      });
    navigation.navigate("Home");
  };

  const uploadstufftofirebasestorage = async () => {
    const uri = story;
    const childpath = `stories/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log(childpath);
    console.log(childpath);
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childpath).put(blob);

    const taskprogreess = (snapshot) => {
      console.log(snapshot.bytesTransferred);
    };

    const taskcompleted = (snapshot) => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        submittofirestore(snapshot);
        console.log(snapshot);
      });
    };

    const taskerror = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskprogreess, taskerror, taskcompleted);
  };

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "bold",
          alignItems: "center",
          bottom: 70,
        }}
      >
        Select Image For Story
      </Text>
      <TouchableOpacity
        onPress={() => pickImage()}
        style={{ marginBottom: 40 }}
      >
        {story ? (
          <Image source={{ uri: story }} style={{ width: 300, height: 300 }} />
        ) : (
          <Ionicons name='images-outline' size={124} color='white' />
        )}
      </TouchableOpacity>
      {story ? (
        <Button
          icon={
            <Icon
              name='send'
              size={24}
              color='white'
              style={{ marginRight: 10 }}
            />
          }
          title='Select'
          onPress={() => uploadstufftofirebasestorage()}
        />
      ) : (
        <Button
          icon={
            <Icon
              name='send'
              size={24}
              color='white'
              style={{ marginRight: 10 }}
            />
          }
          title='Submit'
          disabled
        />
      )}
    </View>
  );
};

export default SetStories;
