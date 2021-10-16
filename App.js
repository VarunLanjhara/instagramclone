import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NewPost from "./components/NewPost/NewPost";
import Login from "./components/AuthStuff/Login";
import Register from "./components/AuthStuff/Register";
import Loader from "./Loader";
import NewScreenUser from "./components/AuthStuff/NewScreenUser";
import { LogBox } from "react-native";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import Comment from "./components/Home/Comment";
import SetStories from "./components/Home/SetStories";
import ShowStories from "./components/Home/ShowStories";
import ForgotPassword from "./components/AuthStuff/ForgotPassword";
import MessageScreen from "./components/MessageScreen/MessageScreen";
import Activity from "./components/Home/Activity";

export default function App() {
  const Stack = createStackNavigator();

  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Loader'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='NewPost' component={NewPost} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Loader' component={Loader} />
        <Stack.Screen name='NewScreenUser' component={NewScreenUser} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='Comment' component={Comment} />
        <Stack.Screen name='SetStories' component={SetStories} />
        <Stack.Screen name='ShowStories' component={ShowStories} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='MessageScreen' component={MessageScreen} />
        <Stack.Screen name='Activity' component={Activity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
