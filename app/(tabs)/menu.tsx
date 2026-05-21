import { colors } from "@/constants/theme";
import { LayoutGrid, Settings, Users, Van } from "lucide-react-native";
import { styled } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const MENU_LINKS = [
  {
    name: "Vehicles",
    href: "/vehicles",
    icon: Van,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: LayoutGrid,
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const MenuScreen = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white pl-5 pt-5 pr-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInset={{ bottom: 20 }}
      >
        <Text className="text-2xl font-sans-extrabold mb-4">Menu</Text>

        <View className="flex-row gap-4 flex-wrap">
          {MENU_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <TouchableOpacity
                key={link.name}
                className="items-center bg-white border border-border rounded p-4 flex-1 min-w-[35%]"
              >
                <Icon
                  size={40}
                  color={colors.color_primary}
                  strokeWidth={1.25}
                />

                <Text className="font-sans-bold mt-3">{link.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;
