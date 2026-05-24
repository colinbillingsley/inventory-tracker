import CustomPressable from "@/components/custom-ui/custom-pressable";
import { HOME_USER } from "@/constants/data";
import { colors } from "@/constants/theme";
import { Edit, Eye, EyeOffIcon } from "lucide-react-native";
import { styled } from "nativewind";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const AccountScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white pl-5 pr-5 pt-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInset={{ bottom: 20 }}
      >
        <Text className="font-sans-extrabold text-2xl mb-4">Your Account</Text>
        <View className="gap-8">
          <View className="gap-3">
            <View className="mb-2">
              <Text className="font-sans-semibold text-lg mb-2">
                Account Info
              </Text>
              <View className="h-[1px] w-full bg-subtext/35" />
            </View>
            <View className="flex-row gap-2">
              <Text className="font-sans-regular">Name:</Text>
              <Text className="font-sans-bold">{HOME_USER.name}</Text>
            </View>
            <View className="flex-row gap-2">
              <Text className="font-sans-regular">Email:</Text>
              <Text className="font-sans-bold">{HOME_USER.email}</Text>
            </View>
            <View className="flex-row gap-2">
              <Text className="font-sans-regular">Company:</Text>
              <Text className="font-sans-bold">{HOME_USER.company}</Text>
            </View>

            <CustomPressable className="flex-row gap-2 items-center bg-white border border-border px-2 py-3 rounded self-start mt-5">
              <Edit size={18} color={colors.color_black} strokeWidth={1.5} />
              <Text className="font-sans-semibold text-center">
                Edit Account Info
              </Text>
            </CustomPressable>
          </View>

          <View className="gap-3">
            <View className="mb-2">
              <Text className="font-sans-semibold text-lg mb-2">Roles</Text>
              <View className="h-[1px] w-full bg-subtext/35" />
            </View>

            <View className="flex-row gap-2">
              <Text className="font-sans-regular p-2 rounded-full border border-border">
                Administrator
              </Text>
            </View>

            <CustomPressable className="flex-row gap-2 items-center bg-white border border-border px-2 py-3 rounded self-start mt-5">
              <Edit size={18} color={colors.color_black} strokeWidth={1.5} />
              <Text className="font-sans-semibold text-center">Edit Roles</Text>
            </CustomPressable>
          </View>

          <View className="gap-3">
            <View className="mb-2">
              <Text className="font-sans-semibold text-lg mb-2">Security</Text>
              <View className="h-[1px] w-full bg-subtext/35" />
            </View>

            <View className="gap-4">
              <View className="flex-row gap-2 items-center justify-between">
                <View className="flex-row gap-2 items-center">
                  <Text className="font-sans-regular">Password:</Text>
                  <Text className="font-sans-bold">
                    {showPassword ? HOME_USER.password : "**************"}
                  </Text>
                </View>

                <CustomPressable
                  onPress={() => setShowPassword(!showPassword)}
                  className={`flex-row items-center gap-2 bg-white border border-border rounded px-4 py-3`}
                >
                  {showPassword ? (
                    <EyeOffIcon
                      color={colors.color_black}
                      strokeWidth={1.25}
                      size={18}
                    />
                  ) : (
                    <Eye
                      color={colors.color_black}
                      strokeWidth={1.25}
                      size={18}
                    />
                  )}
                  <Text className="font-sans-medium">
                    {showPassword ? "Hide Password" : "Show Password"}
                  </Text>
                </CustomPressable>
              </View>
              <TouchableOpacity className="bg-primary px-2 py-3 rounded w-fit">
                <Text className="font-sans-bold text-white text-center">
                  Change Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border-2 border-primary px-2 py-3 rounded w-fit">
                <Text className="font-sans-bold text-primary text-center">
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
