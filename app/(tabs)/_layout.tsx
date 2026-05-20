import { TAB_ICONS } from "@/constants/data";
import { colors } from "@/constants/theme";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs>
      {Object.entries(TAB_ICONS).map(([name, config]) => (
        <NativeTabs.Trigger
          key={name}
          name={name}
          options={{ selectedIconColor: colors.color_primary }}
        >
          <Label>{config.title}</Label>

          <Icon sf={config.sf} />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
