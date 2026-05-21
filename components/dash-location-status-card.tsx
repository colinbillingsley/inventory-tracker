import React from "react";
import { Text, View } from "react-native";

const DashLocationStatusCard = ({
  totalEquipment,
  locations,
}: {
  totalEquipment: number;
  locations: {
    id: string;
    name: string;
    amount: number;
  }[];
}) => {
  const calculatedWidthPercentage = (num: number): `${number}%` => {
    if (totalEquipment === 0) return "0%";

    return `${Math.round((num / totalEquipment) * 100)}%`;
  };

  const StatusRow = ({ label, value }: { label: string; value: number }) => {
    return (
      <View className="relative w-full overflow-hidden rounded border">
        {/* Background Fill */}
        <View
          style={{
            width: calculatedWidthPercentage(value),
          }}
          className={`absolute left-0 top-0 bottom-0 bg-primary/25`}
        />

        {/* Content */}
        <View className="flex-row items-center justify-between p-3">
          <Text className="font-sans-medium">{label}</Text>

          <Text className="font-sans-bold">{value}</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="bg-white border border-border rounded p-4">
      <View className="mb-4 gap-3">
        <Text className="font-sans-bold">Equipment by Location</Text>

        <View className="h-[1px] w-full bg-primary" />
      </View>

      <View className="gap-3">
        {locations.map((location) => (
          <StatusRow
            key={location.id}
            label={location.name}
            value={location.amount}
          />
        ))}
      </View>
    </View>
  );
};

export default DashLocationStatusCard;
