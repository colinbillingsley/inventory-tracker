import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);
export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50 p-5 gap-4">
      <Text className="text-xl font-bold">Inventory Tracker</Text>

      <Link href="/login" asChild>
        <TouchableOpacity className="p-4 bg-teal-600 rounded">
          <Text className="text-white">Go to Login</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/signup" asChild>
        <TouchableOpacity className="p-4 bg-teal-600 rounded">
          <Text className="text-white">Go to Signup</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/inventory/vehicle1" asChild>
        <TouchableOpacity className="p-4 bg-teal-600 rounded">
          <Text className="text-white">Go to Vehicle1</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}
