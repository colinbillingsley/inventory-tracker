import DashInventoryStatusCard from "@/components/dash-inventory-status-card";
import DashLocationStatusCard from "@/components/dash-location-status-card";
import DashSmallInventoryCard from "@/components/dash-small-inventory-card";
import UserCheckedOutEquipment, {
  UserCheckedOutEquipmentProps,
} from "@/components/user-checkedout-equipment";
import { HOME_USER, locations, tools } from "@/constants/data";
import { colors } from "@/constants/theme";
import { Tool } from "@/constants/types";
import dayjs from "dayjs";
import { MapPin, Plus, Van, Wrench } from "lucide-react-native";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function Index() {
  const [availableToolsAmount, setAvailableToolsAmount] = useState(0);
  const [checkedOutToolsAmount, setCheckedOutToolsAmount] = useState(0);
  const [outOfOrderToolsAmount, setOutOfOrderToolsAmount] = useState(0);

  const [availableToolsList, setAvailableToolsList] = useState<Tool[]>([]);
  const [checkedOutToolsList, setCheckedOutToolsList] = useState<Tool[]>([]);
  const [outOfOrderToolsList, setOutOfOrderToolsList] = useState<Tool[]>([]);

  const [userCheckedOutEquipment, setUserCheckedOutEquipment] = useState<
    UserCheckedOutEquipmentProps[]
  >([
    {
      id: "1",
      name: "Milwaulkee Core Drill",
      serial: "#MIL-32924532",
      location: "Wawa - Bellevue",
    },
  ]);

  const [locationsStatus, setLocationsStatus] = useState<
    { id: string; name: string; amount: number }[]
  >([]);

  const date = dayjs(new Date());

  function determineToolStatuses() {
    const counts = tools?.reduce(
      (acc, tool) => {
        acc[tool.status]++;

        return acc;
      },
      {
        available: 0,
        checked_out: 0,
        out_of_service: 0,
      },
    );
    setAvailableToolsAmount(counts.available);
    setCheckedOutToolsAmount(counts.checked_out);
    setOutOfOrderToolsAmount(counts.out_of_service);
  }

  function setToolStatusLists() {
    const available = tools.filter((tool) => tool.status === "available");
    const checkedOut = tools.filter((tool) => tool.status === "checked_out");
    const outOfService = tools.filter(
      (tool) => tool.status === "out_of_service",
    );

    setAvailableToolsList(available);
    setCheckedOutToolsList(checkedOut);
    setOutOfOrderToolsList(outOfService);
  }

  function determineLocationStatus() {
    locations.forEach((location) => {
      setLocationsStatus((prev) => [
        ...prev,
        {
          id: location.id,
          name: location.name,
          amount: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
        },
      ]);
    });
  }

  useEffect(() => {
    determineToolStatuses();
    setToolStatusLists();
    determineLocationStatus();
    console.log("useeffect");
  }, []);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white pl-5 pr-5 pt-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInset={{ bottom: 20 }}
      >
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-2xl font-sans-extrabold mb-2">Dashboard</Text>
            <TouchableOpacity className="border border-primary rounded-full p-2">
              <Plus size={25} color={colors.color_primary} />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="font-sans-bold text-xl mb-1">
              {HOME_USER.company}
            </Text>
            <Text className="font-sans-semibold text-lg">
              {date.format("dddd, MMM DD")}
            </Text>
            {/* <Text className="font-sans-extrabold text-lg">
              Good morning, {HOME_USER.name}
            </Text> */}
          </View>
        </View>

        <View className="gap-4">
          <View>
            <UserCheckedOutEquipment equipment={userCheckedOutEquipment} />
          </View>

          <View className="flex flex-row items-center justify-center gap-2 ">
            <DashSmallInventoryCard icon={Wrench} title="Tools" amount={0} />
            <DashSmallInventoryCard icon={Van} title="Vehicles" amount={0} />
            <DashSmallInventoryCard
              icon={MapPin}
              title="Locations"
              amount={0}
            />
          </View>

          <View>
            <DashInventoryStatusCard
              totalTools={100}
              available={78}
              checkedOut={20}
              outOfOrder={2}
            />
          </View>

          <View>
            <DashLocationStatusCard
              totalEquipment={109}
              locations={locationsStatus}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
