import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import styles from "./HomeScreenStyle";
import Header from "../components/Home/Header";
import Stories from "../components/Home/Stories";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Post from "../components/Home/Post";
import { POSTS } from "../data/posts";
import BottomTab from "../components/Home/BottomTab";
import { db, firebase } from "../firebase";
import SkeletonContent from "react-native-skeleton-content";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
  const scrollRef = useRef();
  const navigation = useNavigation();

  const scrolltoptop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const [refreshing, setrefreshing] = useState(false);
  const [posts, setposts] = useState([]);

  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(function () {
      navigation.navigate("Home");
      setrefreshing(false);
    }, Math.floor(Math.random() * 3));
  };

  const [loading, setloading] = useState(true);

  useEffect(() => {
    db.collectionGroup("posts").onSnapshot((snapshot) => {
      setposts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setloading(false);
    }, 3000);
  });

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Header scrolltoptop={scrolltoptop} />
        <ScrollView
          ref={scrollRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Stories />
          <Divider orientation='vertical' style={styles.divider} />
          {posts.map((post, index) => (
            <SkeletonContent
              key={index}
              containerStyle={{
                justifyContent: "center",
                marginBottom: loading ? 30 : 0,
              }}
              boneColor='#121212'
              highlightColor='#333333'
              animationType='shiver'
              isLoading={loading}
              layout={[
                {
                  key: "top_container",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  marginTop: 15,
                  paddingHorizontal: 15,
                  children: [
                    {
                      key: "profile_picture",
                      width: 45,
                      height: 45,
                      borderRadius: 25,
                    },
                    {
                      key: "user_name",
                      width: 130,
                      height: 20,
                      marginLeft: 10,
                    },
                  ],
                },
                {
                  key: "main_image",
                  width: "100%",
                  height: 440,
                  marginBottom: 6,
                  borderRadius: 0,
                },
              ]}
            >
              <Post post={post} key={index} />
            </SkeletonContent>
          ))}
        </ScrollView>
        {posts.map((post, index) => (
          <BottomTab post={post} key={index} />
        ))}
      </SafeAreaView>
      <StatusBar hidden />
    </View>
  );
};

export default HomeScreen;
