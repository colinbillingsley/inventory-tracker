import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

const SettingsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50 p-5 gap-4">
      <Text>SettingsScreen</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;
