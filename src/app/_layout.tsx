import { colors } from "@/styles/global";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const isAuth = false;

  useEffect(() => {
    if (!isAuth) {
      return router.replace("/(auth)/login");
    }
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="meal/[id]"
        options={{
          headerBackButtonDisplayMode: "minimal", // arrow only, no text
          headerStyle: { backgroundColor: colors.bg },
        }}
      />
    </Stack>
  );
}
