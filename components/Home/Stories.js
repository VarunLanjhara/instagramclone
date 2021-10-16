import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { USERS } from "../../data/users";
import styles from "./StoriesStyles";
import { firebase, db } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import SkeletonContent from "react-native-skeleton-content";

const Stories = () => {
  const [stories, setstories] = useState([]);
  const [loading, setloading] = useState(true);

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
  const navigation = useNavigation();

  const redirectoshowstories = () => {
    navigation.navigate("ShowStories", { stories });
  };
  useEffect(() => {
    db.collectionGroup("story").onSnapshot((snapshot) => {
      setstories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setloading(false);
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SetStories")}>
            <Image
              source={{
                uri: "https://preview.redd.it/v8z0crk5gho71.png?width=640&crop=smart&auto=webp&s=8afbdf5f25c33718c810de00f40cb267ef9ae469",
              }}
              style={styles.story}
            />
          </TouchableOpacity>
          <Text style={{ color: "#bebfc2", marginLeft: 25, marginTop: 2 }}>
            Your Story
          </Text>
        </View>
        {stories.map((story, index) => (
          <View key={index}>
            <SkeletonContent
              isLoading={loading}
              boneColor='#121212'
              highlightColor='#333333'
              animationType='shiver'
              containerStyle={{
                width: "100%",
                flexDirection: "row",
              }}
              layout={[
                {
                  key: "idkhelpme",
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  marginLeft: 20,
                  borderWidth: 3,
                  borderColor: "#ff8501",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("ShowStories", story)}
              >
                <Image
                  source={{ uri: story.user.profile_pic }}
                  style={styles.story}
                />
                <Text style={styles.storytext}>
                  {story.user.username.length >= 7
                    ? story.user.username.slice(0, 6).toLowerCase() + "..."
                    : story.user.username.toLowerCase()}
                </Text>
              </TouchableOpacity>
            </SkeletonContent>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;
