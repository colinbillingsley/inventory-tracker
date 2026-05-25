import "@/global.css";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "sans-regular": require(`../assets/fonts/PlusJakartaSans-Regular.ttf`),
    "sans-italic": require(`../assets/fonts/PlusJakartaSans-Italic.ttf`),
    "sans-medium": require(`../assets/fonts/PlusJakartaSans-Medium.ttf`),
    "sans-medium-italic": require(
      `../assets/fonts/PlusJakartaSans-MediumItalic.ttf`,
    ),
    "sans-semi-bold": require(`../assets/fonts/PlusJakartaSans-SemiBold.ttf`),
    "sans-semi-bold-italic": require(
      `../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf`,
    ),
    "sans-bold": require(`../assets/fonts/PlusJakartaSans-Bold.ttf`),
    "sans-bold-italic": require(
      `../assets/fonts/PlusJakartaSans-BoldItalic.ttf`,
    ),
    "sans-extra-bold": require(`../assets/fonts/PlusJakartaSans-ExtraBold.ttf`),
    "sans-extra-bold-italic": require(
      `../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf`,
    ),
    "sans-light": require(`../assets/fonts/PlusJakartaSans-Light.ttf`),
    "sans-light-italic": require(
      `../assets/fonts/PlusJakartaSans-LightItalic.ttf`,
    ),
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Slot />
    </ClerkProvider>
  );
}
