import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from "react-native";
import styles from "./CommentStyle";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { firebase, db } from "../../firebase";

const Comment = ({ route }) => {
  const navigation = useNavigation();
  const backfromcommenbts = () => {
    navigation.goBack();
  };

  const { post } = route.params;
  console.log(post);

  const [comment, setcomment] = useState("");

  const errorboiahhaha = () => {
    Alert.alert("Comment Eror", "Comment Must Be Of 4 Letters", [
      {
        text: "Ok",
      },
    ]);
  };

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
  }, []);

  const getcommentdata = () => {
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          comment,
          currentuser,
        }),
      });
    setcomment("");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerstuff}>
        <TouchableOpacity onPress={backfromcommenbts}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            right: 100,
          }}
        >
          Comment On {post.user} Post
        </Text>
      </View>

      <ScrollView>
        {post.comments.map((post, index) => (
          <View style={styles.commentboi} key={index}>
            <Image
              source={{ uri: post.currentuser.profile_pic }}
              style={styles.pfp_commentboi}
            />
            <View>
              <Text style={{ color: "#9f8e8e", marginLeft: 2, fontSize: 14 }}>
                {post.currentuser.username}
              </Text>
              <Text
                style={{
                  color: "white",
                  marginLeft: 5,
                  top: 4,
                  fontWeight: "600",
                }}
              >
                {post.comment}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView style={styles.lastdiv} behavior='padding'>
        <Image source={{ uri: post.profile_pic }} style={styles.user_pfp} />
        <TextInput
          style={styles.input}
          multiline
          placeholder='Add a comment'
          placeholderTextColor='white'
          onChangeText={(value) => setcomment(value)}
          value={comment}
        />
        {comment.length >= 4 ? (
          <TouchableOpacity
            style={{ left: 18, top: 30 }}
            onPress={getcommentdata}
          >
            <Ionicons name='send-outline' size={24} color='white' />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ left: 18, top: 30 }}
            onPress={errorboiahhaha}
          >
            <Ionicons
              name='send-outline'
              size={24}
              color='white'
              style={{ opacity: 0.4 }}
            />
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Comment;
