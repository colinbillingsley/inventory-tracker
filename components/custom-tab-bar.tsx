// components/navigation/CustomTabBar.tsx
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Home, Settings, User, Wrench } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const icons = {
    index: Home,
    inventory: Wrench,
    account: User,
    settings: Settings,
  };

  const labels = {
    index: "Home",
    inventory: "Inventory",
    account: "Account",
    settings: "Settings",
  };

  return (
    <View
      className="flex-row bg-white pt-2"
      style={{ paddingBottom: insets.bottom }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const Icon = icons[route.name as keyof typeof icons];

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            className={`flex-1 items-center gap-1`}
          >
            <View
              className={`p-2 rounded-xl transition-[colors, transform] duration-300 ${isFocused ? "bg-primary -translate-y-1" : ""}`}
            >
              <Icon
                size={22}
                className={`transition-[colors] duration-300 ${isFocused ? "text-white" : "text-black"}`}
              />
            </View>

            <Text
              className={`font-sans-medium text-xs capitalize transition-[colors, transform] duration-300 ${
                isFocused ? "text-primary -translate-y-1" : "text-black"
              }`}
            >
              {labels[route.name as keyof typeof labels]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
