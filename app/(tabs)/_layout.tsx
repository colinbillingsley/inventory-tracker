import { Tabs } from "expo-router";
import "@/global.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";
import clsx from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { components } from "@/constants/theme";

const tabBar = components.tabBar;

const tabs = [
  {
    name: "index",
    title: "Home",
    icon: "home",
  },
  {
    name: "inventory",
    title: "Inventory",
    icon: "cube",
  },
  {
    name: "account",
    title: "Account",
    icon: "person",
  },
  {
    name: "settings",
    title: "Settings",
    icon: "settings",
  },
] as const;

type TabIconProps = {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
};

function TabIcon({ focused, icon, title }: TabIconProps) {
  return (
    <View className={clsx(`items-center justify-center gap-1 mt-2`)}>
      <View className={clsx("p-3 rounded-full", focused && "bg-teal-200")}>
        <Ionicons
          name={icon}
          size={tabBar.iconFrame / 2.5}
          color={focused ? "#0f766e" : "#525252"}
        />
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
        },
        tabBarIconStyle: {
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
          alignItems: "center",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,

            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} title={tab.title} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
