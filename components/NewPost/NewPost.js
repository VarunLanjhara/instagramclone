import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./NewPostStyle";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { db, firebase } from "../../firebase";

const NewPost = () => {
  const navigation = useNavigation();
  const toogletohomescren = () => {
    navigation.goBack();
  };

  const [image, setImage] = useState(null);
  const [caption, setcaption] = useState("");
  const [currentuser, setcurrentuser] = useState(null);

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

  const submittofirebase = (downloadurl) => {
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: downloadurl,
        owner_id: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        user: currentuser.username,
        profile_pic: currentuser.profile_pic,
        caption: caption,
        createdate: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        comments: [],
        likes_by_user: [],
      });
    navigation.navigate("Home");
    return unsubscribe;
  };

  const sumbhiterror = () => {
    if (caption.length <= 8) {
      Alert.alert(
        "Caption Must Be Of 8 Letters",
        "Caption must be of 8 letters to create post",
        [
          {
            text: "Ok",
          },
        ]
      );
    } else if (image == null) {
      Alert.alert("Select An Image", "Image is required to create post", [
        {
          text: "OK",
        },
      ]);
    }
  };

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadimagetofirebasestorage = async () => {
    const uri = image;
    const childpath = `posts/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log(childpath);
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childpath).put(blob);

    const taskprogress = (snapshot) => {
      console.log(snapshot.bytesTransferred);
    };

    const taskcompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        submittofirebase(snapshot);
        console.log(snapshot);
      });
    };
    const taskerror = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskprogress, taskerror, taskcompleted);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign
            name='arrowleft'
            size={28}
            color='white'
            onPress={toogletohomescren}
          />
        </TouchableOpacity>
        <Text style={styles.newpost}>New Post</Text>

        {caption.length >= 8 && image != null ? (
          <TouchableOpacity onPress={() => uploadimagetofirebasestorage()}>
            <AntDesign
              name='check'
              size={28}
              color='#0079d3'
              style={{ marginLeft: 140 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={sumbhiterror}>
            <AntDesign
              name='check'
              size={28}
              color='#0079d3'
              style={{ marginLeft: 140, opacity: 0.4 }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.mainstuff}>
        <Image
          source={{
            uri: "https://pbs.twimg.com/profile_images/1422644317676507136/EszIU9uI_400x400.jpg",
          }}
          style={styles.userimage}
        />
        <TextInput
          multiline
          placeholder='Write a caption...'
          style={styles.inputboihahaha}
          placeholderTextColor='gray'
          maxLength={100}
          onChangeText={(value) => setcaption(value)}
        />
        <TouchableOpacity
          style={{ height: 27, top: 14, left: 40 }}
          onPress={pickImage}
        >
          <Ionicons name='image-outline' size={29} color='white' />
        </TouchableOpacity>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 250,
              height: 250,
              top: 250,
              right: 240,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewPost;
