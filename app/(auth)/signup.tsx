import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session }) => {
          if (session?.currentTask) return;

          router.push("/"); // ✅ clean + type-safe
        },
      });
    } else {
      console.error("Sign-up not complete:", signUp);
    }
  };

  if (signUp.status === "complete" || isSignedIn) return null;

  const showVerify =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0;

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <View className="bg-white p-4 h-full">
        {/* TITLE */}
        <Text className="text-2xl font-bold mb-2">
          {showVerify ? "Verify your account" : "Sign up"}
        </Text>

        {/* VERIFY FLOW */}
        {showVerify ? (
          <>
            <TextInput
              className="border border-neutral-300 rounded-lg p-3 text-base bg-white"
              value={code}
              placeholder="Enter verification code"
              placeholderTextColor="#666"
              keyboardType="numeric"
              onChangeText={setCode}
            />

            {errors.fields?.code && (
              <Text className="text-red-500 text-xs">
                {errors.fields.code.message}
              </Text>
            )}

            <Pressable
              onPress={handleVerify}
              disabled={fetchStatus === "fetching"}
              className={`py-3 rounded-lg items-center mt-2 ${
                fetchStatus === "fetching"
                  ? "bg-primary/50"
                  : "bg-primary active:opacity-70"
              }`}
            >
              <Text className="text-white font-semibold">Verify</Text>
            </Pressable>

            <Pressable
              onPress={() => signUp.verifications.sendEmailCode()}
              className="py-3 items-center"
            >
              <Text className="text-primary font-semibold">
                I need a new code
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <View className="gap-2 p-4 bg-neutral-50 rounded-2xl border border-border/50">
              {/* EMAIL */}
              <Text className="font-semibold text-sm">Email address</Text>
              <TextInput
                className="border border-neutral-300 rounded-lg p-3 text-base bg-white"
                value={emailAddress}
                placeholder="Enter email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmailAddress}
              />

              {errors.fields?.emailAddress && (
                <Text className="text-red-500 text-xs">
                  {errors.fields.emailAddress.message}
                </Text>
              )}

              {/* PASSWORD */}
              <Text className="font-semibold text-sm mt-2">Password</Text>
              <TextInput
                className="border border-neutral-300 rounded-lg p-3 text-base bg-white"
                value={password}
                placeholder="Enter password"
                placeholderTextColor="#666"
                secureTextEntry
                onChangeText={setPassword}
              />

              {errors.fields?.password && (
                <Text className="text-red-500 text-xs">
                  {errors.fields.password.message}
                </Text>
              )}

              {/* SIGN UP BUTTON */}
              <Pressable
                onPress={handleSubmit}
                disabled={
                  !emailAddress || !password || fetchStatus === "fetching"
                }
                className={`py-3 rounded-lg items-center mt-3 ${
                  !emailAddress || !password || fetchStatus === "fetching"
                    ? "bg-primary/50"
                    : "bg-primary active:opacity-70"
                }`}
              >
                <Text className="text-white font-semibold">Sign up</Text>
              </Pressable>
            </View>
          </>
        )}

        {/* LINK */}
        <View className="flex-row items-center gap-1 mt-4">
          <Text className="text-neutral-700">Already have an account?</Text>
          <Link href="/login">
            <Text className="text-primary font-semibold">Sign in</Text>
          </Link>
        </View>

        {/* CLERK CAPTCHA */}
        <View nativeID="clerk-captcha" />
      </View>
    </SafeAreaView>
  );
}
