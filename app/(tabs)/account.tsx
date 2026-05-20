import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

const AccountScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50 p-5 gap-4">
      <Text>AccountScreen</Text>
    </SafeAreaView>
  );
};

export default AccountScreen;
