import {
  MapPin,
  Plus,
  ScanLine,
  SlidersHorizontal,
  User,
} from "lucide-react-native";
import { styled } from "nativewind";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

import CustomPressable from "@/components/custom-ui/custom-pressable";
import { tools } from "@/constants/data";
import { colors } from "@/constants/theme";
import { Tool } from "@/constants/types";

const SafeAreaView = styled(RNSafeAreaView);

const FILTERS = [
  { id: "all", name: "All" },
  { id: "available", name: "Available" },
  { id: "checked_out", name: "Checked Out" },
  { id: "out_of_service", name: "Out of Service" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, any> = {
    available: "text-available bg-available/10",
    checked_out: "text-checked-out-foreground bg-checked-out/10",
    out_of_service: "text-out-of-service bg-out-of-service/10",
  };

  const labelMap: Record<string, string> = {
    available: "Available",
    checked_out: "Checked Out",
    out_of_service: "Out of Service",
  };

  return (
    <Text
      className={`text-xs font-sans-bold px-3 py-1 rounded-full ${map[status] || "bg-primary/10 text-primary"}`}
    >
      {labelMap[status] || "Unknown"}
    </Text>
  );
};

const FilterTab = ({ item, selected, onPress }: any) => {
  const active = selected === item.id;

  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      className={`px-4 py-2 rounded-full border mr-2 ${
        active ? "bg-primary border-primary" : "bg-white border-border"
      }`}
    >
      <Text
        className={
          active ? "text-white font-sans-medium" : "text-black font-sans-medium"
        }
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const InventoryCard = ({ item }: { item: Tool }) => {
  return (
    <TouchableOpacity className="bg-white border border-border rounded-lg p-4 mb-3 flex-row justify-between">
      {/* Left accent based on status */}
      <View
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
          item.status === "available"
            ? "bg-available"
            : item.status === "checked_out"
              ? "bg-checked-out"
              : "bg-out-of-service"
        }`}
      />

      {/* Main info */}
      <View className="flex-1 pl-3 gap-2">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="font-sans-bold text-base">{item.name}</Text>
            <Text className="text-subtext text-sm">#{item.serial_number}</Text>
          </View>

          <StatusBadge status={item.status} />
        </View>

        {/* Metadata */}
        <View className="flex-row items-center gap-4 mt-2">
          {item.assignedToUser && (
            <View className="flex-row items-center gap-1">
              <User size={14} color={colors.color_subtext} />
              <Text className="text-sm text-subtext">
                {item.assignedToUser}
              </Text>
            </View>
          )}

          {item.current_location_id && (
            <View className="flex-row items-center gap-1">
              <MapPin size={14} color={colors.color_subtext} />
              <Text className="text-sm text-subtext">
                {item.current_location_id}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const InventoryScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.serial_number?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" || tool.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, selectedFilter]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white pl-5 pt-5 pr-5">
      {/* Header */}
      <View className="mb-4">
        <Text className="font-sans-extrabold text-2xl mb-3">Inventory</Text>

        {/* Action Row */}
        <View className="flex-row items-center gap-2 mb-3">
          {/* Search */}
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search inventory..."
            className="flex-1 border border-border rounded-lg p-3 font-sans-regular bg-white"
          />

          {/* Scan */}
          <CustomPressable className="p-2 border border-border rounded-lg">
            <ScanLine size={20} color={colors.color_black} />
          </CustomPressable>

          {/* Filter */}
          <CustomPressable className="p-2 border border-border rounded-lg">
            <SlidersHorizontal size={20} color={colors.color_black} />
          </CustomPressable>

          {/* Add */}
          <CustomPressable className="p-2 bg-primary rounded-lg">
            <Plus size={20} color="white" />
          </CustomPressable>
        </View>

        {/* Tabs */}
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FilterTab
              item={item}
              selected={selectedFilter}
              onPress={setSelectedFilter}
            />
          )}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredTools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <InventoryCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default InventoryScreen;
