import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  icon: LucideIcon;
  title: string;
  amount: number;
};

const DashSmallInventoryCard = ({ icon: Icon, title, amount }: Props) => {
  return (
    <View className="justify-center gap-2 flex-1 bg-white border border-border rounded p-4">
      <View className="flex-row items-center justify-between w-full">
        <Text className="font-sans-bold">{title}</Text>
        <Icon size={16} strokeWidth={1.5} color={"#8d8d8d"} />
      </View>

      <Text className="font-sans-extrabold text-3xl">{amount}</Text>
    </View>
  );
};

export default DashSmallInventoryCard;
