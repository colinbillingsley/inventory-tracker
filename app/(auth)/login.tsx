import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await finalizeSignIn();
    } else if (signIn.status === "needs_client_trust") {
      const emailFactor = signIn.supportedSecondFactors.find(
        (f) => f.strategy === "email_code",
      );

      if (emailFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else if (signIn.status === "needs_second_factor") {
      // future MFA support
    } else {
      console.error("Sign-in not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await finalizeSignIn();
    } else {
      console.error("Verification failed:", signIn);
    }
  };

  const finalizeSignIn = async () => {
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) return;

        router.push("/");
      },
    });
  };

  const showMfa = signIn.status === "needs_client_trust";

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <View className="bg-white p-4 h-full">
        {/* TITLE */}
        <Text className="text-2xl font-bold mb-2">
          {showMfa ? "Verify your account" : "Log in"}
        </Text>

        {/* MFA / VERIFY FLOW */}
        {showMfa ? (
          <>
            <TextInput
              className="border border-neutral-300 rounded-2xl p-3 text-base bg-white"
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
                  : "bg-primary active:bg-primary/80"
              }`}
            >
              <Text className="text-white font-semibold">Verify</Text>
            </Pressable>

            <Pressable
              onPress={() => signIn.mfa.sendEmailCode()}
              className="py-3 items-center"
            >
              <Text className="text-primary font-semibold">
                I need a new code
              </Text>
            </Pressable>

            <Pressable
              onPress={() => signIn.reset()}
              className="py-3 items-center"
            >
              <Text className="text-neutral-500 font-semibold">Start over</Text>
            </Pressable>
          </>
        ) : (
          <>
            <View className="gap-2 p-4 bg-neutral-50 rounded-2xl border border-border/50">
              {/* EMAIL */}
              <Text className="font-semibold text-sm">Email address</Text>
              <TextInput
                className="border border-neutral-300 rounded-2xl p-3 text-base bg-white"
                value={emailAddress}
                placeholder="Enter email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmailAddress}
              />

              {errors.fields?.identifier && (
                <Text className="text-red-500 text-xs">
                  {errors.fields.identifier.message}
                </Text>
              )}

              {/* PASSWORD */}
              <Text className="font-semibold text-sm mt-2">Password</Text>
              <TextInput
                className="border border-neutral-300 rounded-2xl p-3 text-base bg-white"
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

              {/* SIGN IN BUTTON */}
              <Pressable
                onPress={handleSubmit}
                disabled={
                  !emailAddress || !password || fetchStatus === "fetching"
                }
                className={`py-3 rounded-2xl items-center mt-3 ${
                  !emailAddress || !password || fetchStatus === "fetching"
                    ? "bg-primary/50"
                    : "bg-bg-primary "
                }`}
              >
                <Text className="text-white font-semibold">Continue</Text>
              </Pressable>
            </View>
          </>
        )}

        {/* FOOTER LINK */}
        <View className="flex-row items-center gap-1 mt-4">
          <Text className="text-neutral-700">Don&apos;t have an account?</Text>

          <Link href="/signup">
            <Text className="text-primary font-semibold">Sign up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
