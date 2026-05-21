// components/navigation/CustomTabBar.tsx
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LayoutDashboard, Menu, User, Warehouse } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const icons = {
    index: LayoutDashboard,
    inventory: Warehouse,
    account: User,
    menu: Menu,
  };

  const labels = {
    index: "Dashboard",
    inventory: "Inventory",
    account: "Account",
    menu: "Menu",
  };

  return (
    <View className={`flex-row items-center bg-white`}>
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
            className={`p-4 items-center gap-1 flex-1 border-t-2 ${isFocused ? "bg-primary/5 border-t-primary" : "bg-white border-t-transparent"}`}
            style={{ paddingBottom: insets.bottom }}
          >
            <View
              className={`p-3 rounded-full transition-[colors, transform] duration-200 ${isFocused ? "bg-primary -translate-y-1" : ""}`}
            >
              <Icon
                size={22}
                className={`transition-[colors] duration-200`}
                color={`${isFocused ? "#ffffff" : "#000000"}`}
              />
            </View>

            <Text
              className={`font-sans-medium text-xs capitalize transition-[colors, transform] duration-200 ${
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
