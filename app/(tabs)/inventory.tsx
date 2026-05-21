import { tools } from "@/constants/data";
import { colors } from "@/constants/theme";
import { Tool } from "@/constants/types";
import { MapPin, User } from "lucide-react-native";
import { styled } from "nativewind";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const FILTERS = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "checked_out",
    name: "Checked Out",
  },
  {
    id: "out_of_service",
    name: "Out of Service",
  },
  {
    id: "available",
    name: "Available",
  },
];

const displayStatusStyled = (status: string) => {
  switch (status) {
    case "available":
      return (
        <Text className="font-sans-bold text-available bg-available/10 px-4 py-2 rounded-full">
          Available
        </Text>
      );
    case "checked_out":
      return (
        <Text className="font-sans-bold text-checked-out-foreground bg-checked-out/10 px-4 py-2 rounded-full">
          Checked Out
        </Text>
      );
    case "out_of_service":
      return (
        <Text className="font-sans-bold text-out-of-service bg-out-of-service/10 px-4 py-2 rounded-full">
          Out of Order
        </Text>
      );
    default:
      return (
        <Text className="font-sans-bold text-primary bg-primary/10 px-4 py-2 rounded-full">
          Unknown
        </Text>
      );
  }
};

type FilterProps = {
  id: string;
  name: string;
  selectedFilter: string;
  setSelectedFilter: (x: string) => void;
};

const Filter = ({
  selectedFilter,
  setSelectedFilter,
  ...filter
}: FilterProps) => {
  const isSelected = filter.id === selectedFilter;
  return (
    <Pressable
      onPress={() => {
        setSelectedFilter(filter.id);
      }}
      className={`px-4 py-2 border rounded-full ${isSelected ? "bg-primary border-primary" : "bg-white"}`}
    >
      <Text
        className={`font-sans-medium ${isSelected ? "text-white" : "text-black"}`}
      >
        {filter.name}
      </Text>
    </Pressable>
  );
};

type ItemProps = { item: Tool };
const Item = ({ item }: ItemProps) => (
  <TouchableOpacity className="p-4 h-32 justify-between border rounded bg-white">
    <View className="flex flex-row justify-between">
      <View className="gap-1">
        <Text className="font-sans-bold">{item.name}</Text>
        <Text className="font-sans-medium text-sm text-subtext">
          #{item.serial_number}
        </Text>
      </View>
      <View>{displayStatusStyled(item.status)}</View>
    </View>

    <View className="h-[1px] w-full bg-primary" />

    <View className="flex flex-row items-center gap-4">
      {item.assignedToUser ? (
        <View className="flex-row gap-1">
          <User size={15} color={colors.color_subtext} strokeWidth={2} />
          <Text>{item.assignedToUser}</Text>
        </View>
      ) : (
        <></>
      )}

      {item.current_location_id ? (
        <View className="flex-row gap-1">
          <MapPin size={15} color={colors.color_subtext} strokeWidth={2} />
          <Text>{item.current_location_id}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  </TouchableOpacity>
);

const InventoryScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white pl-5 pt-5 pr-5">
      <Text className="font-sans-extrabold text-2xl mb-4">Inventory</Text>

      <TextInput
        onChangeText={setSearch}
        value={search}
        placeholder="Search tools..."
        className="border p-4 rounded font-sans-regular mb-4 bg-white"
      />

      <View className="mb-4 justify-center items-center">
        <FlatList
          data={FILTERS}
          renderItem={({ item }) => (
            <Filter
              id={item.id}
              name={item.name}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-2" />}
        />
      </View>

      <Text className="font-sans-bold uppercase mb-4">Inventory</Text>

      <FlatList
        data={tools}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{
          paddingBottom: 25,
        }}
        className="flex-1"
      />
    </SafeAreaView>
  );
};

export default InventoryScreen;
