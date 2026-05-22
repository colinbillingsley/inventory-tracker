import { Link } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50 p-5 gap-4">
      <Text>LoginScreen</Text>
      <Link href={"/"} className="bg-primary self-start p-4 text-white">
        Go to Dash
      </Link>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
