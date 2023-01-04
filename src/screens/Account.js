import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import LoginForm from "../components/Auth/LoginForm";
import UserData from "../components/Auth/UserData";
// import {SafeAreaView} from 'react-native-safe-area-context'
import useAuth from "../hooks/useAuth";
export default function Account() {
  const { auth } = useAuth();
  return <View>{auth ? <UserData /> : <LoginForm />}</View>;
}
