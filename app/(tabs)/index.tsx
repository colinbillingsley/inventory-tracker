import { HOME_USER, tools } from "@/constants/data";
import { Tool } from "@/constants/types";
import dayjs from "dayjs";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
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

const displayStatusStyled = (status: string) => {
  switch (status) {
    case "available":
      return (
        <Text className="font-sans-bold text-available bg-available/10 px-4 py-2 rounded-full">
          Available
        </Text>
      );
    case "unavailable":
      return (
        <Text className="font-sans-bold text-unavailable bg-unavailable/10 px-4 py-2 rounded-full">
          Unavailable
        </Text>
      );
    case "out_of_order":
      return (
        <Text className="font-sans-bold text-out-of-order bg-out-of-order/10 px-4 py-2 rounded-full">
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

type FilterProps = { key: string; name: string };

const Filter = ({ ...filter }: FilterProps) => {
  return (
    <Pressable className="px-4 py-2 border rounded-full">
      <Text>{filter.name}</Text>
    </Pressable>
  );
};

type ItemProps = { item: Tool };

const Item = ({ item }: ItemProps) => (
  <TouchableOpacity className="p-4 h-32 justify-between border rounded">
    <View className="flex flex-row justify-between">
      <View className="gap-1">
        <Text className="font-sans-bold">{item.name}</Text>
        <Text className="font-sans-bold text-sm text-subtext">
          #{item.serial_number}
        </Text>
      </View>
      <View>{displayStatusStyled(item.status)}</View>
    </View>

    <View className="h-[1px] w-full bg-primary" />

    <View className="flex flex-row items-center gap-4">
      <Text>{item.assignedToUser}</Text>
      <Text className="font-sans-bold">{item.current_location_id}</Text>
    </View>
  </TouchableOpacity>
);

export default function Index() {
  const [availableToolsAmount, setAvailableToolsAmount] = useState(0);
  const [unavailableToolsAmount, setUnavailableToolsAmount] = useState(0);
  const [outOfOrderToolsAmount, setOutOfOrderToolsAmount] = useState(0);

  const [availableToolsList, setAvailableToolsList] = useState<Tool[]>([]);
  const [unavailableToolsList, setUnavailableToolsList] = useState<Tool[]>([]);
  const [outOfOrderToolsList, setOutOfOrderToolsList] = useState<Tool[]>([]);

  const [search, setSearch] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters: { key: string; name: string }[] = [
    {
      key: "all",
      name: "All",
    },
    {
      key: "available",
      name: "Available",
    },
    {
      key: "in-use",
      name: "In Use",
    },
    {
      key: "out-of-order",
      name: "Out of Order",
    },
  ];

  const date = dayjs(new Date());

  function determineToolStatuses() {
    const counts = tools?.reduce(
      (acc, tool) => {
        acc[tool.status]++;

        return acc;
      },
      {
        available: 0,
        unavailable: 0,
        out_of_order: 0,
      },
    );
    setAvailableToolsAmount(counts.available);
    setUnavailableToolsAmount(counts.unavailable);
    setOutOfOrderToolsAmount(counts.out_of_order);
  }

  function setToolStatusLists() {
    const available = tools.filter((tool) => tool.status === "available");
    const unavailable = tools.filter((tool) => tool.status === "unavailable");
    const out_of_order = tools.filter((tool) => tool.status === "out_of_order");

    setAvailableToolsList(available);
    setUnavailableToolsList(unavailable);
    setOutOfOrderToolsList(out_of_order);
  }

  useEffect(() => {
    determineToolStatuses();
    setToolStatusLists();
    console.log("useeffect");
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 p-5">
      <View>
        <View className="mb-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-4xl font-sans-extrabold mb-2">Home</Text>
            <TouchableOpacity className="bg-white border-2 border-primary p-4 rounded-full">
              <Text className="font-sans-medium text-primary">+ Add Tool</Text>
            </TouchableOpacity>
          </View>
          <Text className="font-sans-semibold text-xl">
            {date.format("dddd, MMM DD")}
          </Text>
          <Text className="font-sans-extrabold text-xl">
            Good morning, {HOME_USER.name}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-center gap-2 mb-10">
          <View className="items-center justify-center gap-2 flex-1 bg-neutral-100 p-4">
            <Text className="font-sans-extrabold text-2xl text-available">
              {availableToolsAmount}
            </Text>
            <Text className="font-sans-bold ">Available</Text>
          </View>
          <View className="items-center justify-center gap-2 flex-1 bg-neutral-100 p-4">
            <Text className="font-sans-extrabold text-2xl text-unavailable">
              {unavailableToolsAmount}
            </Text>
            <Text className="font-sans-bold ">Unavailable</Text>
          </View>
          <View className="items-center justify-center gap-2 flex-1 bg-neutral-100 p-4">
            <Text className="font-sans-extrabold text-2xl text-out-of-order">
              {outOfOrderToolsAmount}
            </Text>
            <Text className="font-sans-bold">Out of Order</Text>
          </View>
        </View>

        <View>
          <TextInput
            onChangeText={setSearch}
            value={search}
            placeholder="Search tools..."
            className="border p-4 rounded font-sans-regular mb-4"
          />
          <View className="mb-4  justify-center items-center">
            <FlatList
              data={filters}
              renderItem={({ item }) => <Filter {...item} />}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-2" />}
            />
          </View>
          <Text className="font-sans-bold uppercase mb-4">Tools</Text>
          <FlatList
            data={tools}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-4" />}
          />
        </View>

        {/* <View className="my-5">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-xl font-sans-bold">
              Available - {availableToolsAmount}
            </Text>
            <Link
              href={"/"}
              className="border-2 border-black py-2 px-4 rounded-full "
            >
              <Text className="font-sans-medium">View All</Text>
            </Link>
          </View>
          <View>
            <FlatList
              data={availableToolsList}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <Text className="font-sans-medium p-4 bg-neutral-100">
                  No available tools/equipment at this time!
                </Text>
              }
            />
          </View>
        </View>

        <View className="my-5">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-xl font-sans-bold">
              Unavailable - {unavailableToolsAmount}
            </Text>
            <Link
              href={"/"}
              className="border-2 border-black py-2 px-4 rounded-full "
            >
              <Text className="font-sans-medium">View All</Text>
            </Link>
          </View>
          <View>
            <FlatList
              data={unavailableToolsList}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <Text className="font-sans-medium p-4 bg-neutral-100">
                  No unavailable tools/equipment at this time!
                </Text>
              }
            />
          </View>
        </View>

        <View className="my-5">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-xl font-sans-bold">
              Out of Order - {outOfOrderToolsAmount}
            </Text>
            <Link
              href={"/"}
              className="border-2 border-black py-2 px-4 rounded-full "
            >
              <Text className="font-sans-medium">View All</Text>
            </Link>
          </View>
          <View>
            <FlatList
              data={outOfOrderToolsList}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <Text className="font-sans-medium p-4 bg-neutral-100">
                  No out of order tools/equipment at this time!
                </Text>
              }
            />
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
