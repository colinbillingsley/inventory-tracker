import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

const InventoryItemDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaView className="flex-1 bg-neutral-50 p-5 gap-4">
      <Text>InventoryItemDetailsScreen</Text>
      <Text>{id}</Text>
    </SafeAreaView>
  );
};

export default InventoryItemDetailsScreen;
