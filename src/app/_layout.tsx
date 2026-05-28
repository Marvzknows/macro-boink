import { colors } from "@/styles/global";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
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
