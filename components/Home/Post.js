import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Share,
} from "react-native";
import styles from "./PostStyle";
import { Entypo } from "@expo/vector-icons";
import { AntDesign, FontAwesome, Feather, Octicons } from "@expo/vector-icons";
import { firebase, db } from "../../firebase";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/core";

const Post = ({ post }) => {
  const [savedposts, setsavedposts] = useState([]);

  const likeboi = () => {
    const likestatus = !post.likes_by_user.includes(
      firebase.auth().currentUser.email
    );

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_user: likestatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      });
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deletepost = () => {
    toggleModal();
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .delete();
    ToastAndroid.show("Deleted Succesfully", ToastAndroid.SHORT);
  };

  const savepost = () => {
    db.collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("savedposts")
      .add({
        postcaption: post.caption,
        postslikes_by_user: post.likes_by_user,
        postsimageurl: post.imageUrl,
        postcreate: post.createdate,
        postowneremail: post.owner_email,
        postuser: post.user,
        postuserpfp: post.profile_pic,
        postcomments: post.comments,
      });
  };

  const unsavepost = () => {
    db.collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("savedposts")
      .doc(post.id)
      .delete();
  };

  const navigation = useNavigation();

  useEffect(() => {
    db.collectionGroup("savedposts").onSnapshot((snapshot) => {
      setsavedposts(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
  }, []);

  const onShare = async () => {
    toggleModal();
    try {
      const result = await Share.share({
        message: post.caption + "Instagram Clone Varun :)",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const commentredirect = () => {
    navigation.navigate("Comment", { post });
  };

  const report = () => {
    toggleModal();
    ToastAndroid.show("Post Reported Succesfully", ToastAndroid.LONG);
  };

  return (
    <View style={styles.container}>
      {/* postheader  */}
      <View style={styles.headercontainer}>
        <View style={styles.leftstuff}>
          <Image source={{ uri: post.profile_pic }} style={styles.headerpfp} />
          <Text style={styles.headeruser}>{post.user.toLowerCase()}</Text>
        </View>
        <View style={styles.rightstuff}>
          <TouchableOpacity onPress={toggleModal}>
            <Entypo name='dots-three-vertical' size={18} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      {/* postimage */}
      <View style={styles.imagecontainer}>
        <Image source={{ uri: post.imageUrl }} style={styles.imageboi} />
      </View>

      {/* postfooter */}
      <View style={styles.fottercontainer}>
        <View style={styles.iconstuff}>
          <View style={styles.leftsideicos}>
            <TouchableOpacity onPress={likeboi}>
              {post.likes_by_user.includes(
                firebase.auth().currentUser.email
              ) ? (
                <AntDesign
                  name='heart'
                  size={26}
                  color='red'
                  style={styles.icon}
                />
              ) : (
                <AntDesign
                  name='hearto'
                  size={26}
                  color='white'
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={commentredirect}>
              <FontAwesome
                name='comment-o'
                size={26}
                color='white'
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                name='send'
                size={26}
                color='white'
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rightsideicons}>
            <TouchableOpacity onPress={savepost}>
              {savedposts ? (
                <Feather name='bookmark' size={26} color='white' />
              ) : (
                <Feather name='bookmark' size={26} color='white' />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.likestuff}>
          <Text style={styles.likecounter}>
            {post.likes_by_user.length.toLocaleString("en")} likes
          </Text>
        </View>
        <View style={styles.caption_stuff}>
          <Text style={styles.usercaption}>{post.user}</Text>
          <Text style={styles.caption}>{" " + " " + post.caption}</Text>
        </View>
        <View style={styles.howmanycomments}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Comment", { post })}
          >
            {!!post.comments.length && (
              <Text style={styles.commenttext}>
                View {post.comments.length > 1 ? "all" : ""}{" "}
                {post.comments.length}
                {post.comments.length > 1 ? " comments" : " comment"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          {post.comments.map((comment, index) => (
            <View key={index} style={styles.comment_stuff}>
              <Text style={styles.usercomment}>
                {comment.currentuser.username}
              </Text>
              <Text style={styles.usercommenttext}>
                {" " + " " + comment.comment}
              </Text>
            </View>
          ))}
        </View>
        {/* <View style={styles.dateago}>
          <Text style={styles.dateagotext}>{post.createdate.nanoseconds}</Text>
        </View> */}
      </View>
      <Modal
        isVisible={isModalVisible}
        animationIn='slideInDown'
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {post.owner_email != firebase.auth().currentUser.email ? (
          <View
            style={{
              backgroundColor: "white",
              top: -70,
              width: 300,
              height: 110,
              justifyContent: "center",
              justifyContent: "center",
              alignItems: "center",
              top: 30,
              borderRadius: 19,
            }}
          >
            <TouchableOpacity
              style={{ left: 119, bottom: 14 }}
              onPress={toggleModal}
            >
              <AntDesign name='close' size={24} color='black' />
            </TouchableOpacity>
            <TouchableOpacity style={{ bottom: 13 }} onPress={onShare}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={report}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Report</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "white",
              top: -70,
              width: 300,
              height: 210,
              justifyContent: "center",
              justifyContent: "center",
              alignItems: "center",
              top: 30,
              borderRadius: 19,
            }}
          >
            <TouchableOpacity
              style={{ left: 119, bottom: 24 }}
              onPress={toggleModal}
            >
              <AntDesign name='close' size={24} color='black' />
            </TouchableOpacity>
            <TouchableOpacity style={{ bottom: 11 }} onPress={onShare}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={report}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ top: 13 }} onPress={deletepost}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ top: 25 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default Post;
