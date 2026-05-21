import { colors } from "@/constants/theme";
import { CircleOff } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type UserCheckedOutEquipmentProps = {
  id: string;
  name: string;
  serial: string;
  location: string;
};

const EquipmentRow = ({
  name,
  serial,
  location,
}: {
  name: string;
  serial: string;
  location: string;
}) => {
  return (
    <TouchableOpacity className="flex-row items-start justify-between p-3 bg-neutral-100 rounded">
      <View className="gap-1">
        <Text className="font-sans-bold">{name}</Text>
        <Text className="font-sans-medium text-sm text-subtext">{serial}</Text>
      </View>
      <Text className="font-sans-bold text-sm">{location}</Text>
    </TouchableOpacity>
  );
};

type ComponentProps = {
  equipment: UserCheckedOutEquipmentProps[];
};

const UserCheckedOutEquipment = ({ equipment }: ComponentProps) => {
  console.log(equipment);
  return (
    <View className="bg-white border border-border rounded p-4">
      <View className="mb-4 gap-3">
        <Text className="font-sans-bold">Your Checked Out Equipment</Text>

        <View className="h-[1px] w-full bg-primary" />
      </View>

      <View className="gap-3">
        {equipment.length > 0 ? (
          <View className="gap-5">
            {equipment.map((equ) => (
              <EquipmentRow
                key={equ.id}
                name={equ.name}
                serial={equ.serial}
                location={equ.location}
              />
            ))}
            <TouchableOpacity className="px-4 py-3 bg-primary rounded-full mt-5">
              <Text className="text-white font-sans-bold text-center">
                Check Out More Equipment
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-2 items-center">
            <CircleOff
              size={28}
              color={colors.color_subtext}
              strokeWidth={1.25}
            />
            <Text className="font-sans-regular text-subtext text-center">
              You currently do not have any equipment checked out.
            </Text>

            <TouchableOpacity className="px-4 py-3 bg-primary rounded-full w-full mt-5">
              <Text className="text-white font-sans-bold text-center">
                Check Out Equipment
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserCheckedOutEquipment;

const styles = StyleSheet.create({});
