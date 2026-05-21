import React from "react";
import { Text, View } from "react-native";

const DashInventoryStatusCard = ({
  totalTools,
  available,
  checkedOut,
  outOfOrder,
}: {
  totalTools: number;
  available: number;
  checkedOut: number;
  outOfOrder: number;
}) => {
  const calculatedWidthPercentage = (num: number): `${number}%` => {
    if (totalTools === 0) return "0%";

    return `${Math.round((num / totalTools) * 100)}%`;
  };

  const StatusRow = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color: string;
  }) => {
    return (
      <View className="relative w-full overflow-hidden rounded border">
        {/* Background Fill */}
        <View
          style={{
            width: calculatedWidthPercentage(value),
          }}
          className={`absolute left-0 top-0 bottom-0 ${color}`}
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
        <Text className="font-sans-bold">Inventory by Status</Text>

        <View className="h-[1px] w-full bg-primary" />
      </View>

      <View className="gap-3">
        <StatusRow
          label="Available"
          value={available}
          color="bg-available/25"
        />

        <StatusRow
          label="Checked Out"
          value={checkedOut}
          color="bg-checked-out/25"
        />

        <StatusRow
          label="Out of Service"
          value={outOfOrder}
          color="bg-out-of-service/25"
        />
      </View>
    </View>
  );
};

export default DashInventoryStatusCard;
