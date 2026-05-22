import { colors } from "@/constants/theme";
import { LayoutGrid, MapPin, Settings, Users, Van } from "lucide-react-native";
import { styled } from "nativewind";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const MENU_LINKS = [
  { name: "Vehicles", href: "/vehicles", icon: Van },
  { name: "Categories", href: "/categories", icon: LayoutGrid },
  { name: "Locations", href: "/locations", icon: MapPin },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

const MenuScreen = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white pl-5 pt-5 pr-5">
      <Text className="text-2xl font-sans-extrabold mb-4">Menu</Text>

      <FlatList
        data={MENU_LINKS}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => {
          const Icon = item.icon;

          return (
            <TouchableOpacity className="flex-1 items-center bg-white border border-primary rounded-xl p-4">
              <Icon size={40} color={colors.color_primary} strokeWidth={0.75} />
              <Text className="font-sans-bold mt-3">{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default MenuScreen;
