// app/(tabs)/_layout.tsx
import CustomTabBar from "@/components/custom-tab-bar";
import { TAB_ICONS } from "@/constants/data";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {TAB_ICONS.map((tab, index) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{ title: tab.title }}
        />
      ))}
    </Tabs>
  );
}
