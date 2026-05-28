import { AuthProvider, useAuth } from "@/context/AuthContext";
import { colors } from "@/styles/global";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const isAuth = false;

  useEffect(() => {
    // if (loading) return;
    // if (session) {
    //   router.replace("/(auth)/login");
    // } else {
    //   router.replace("/(tabs)");
    // }
    if (isAuth) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/login");
    }
  }, [session, loading]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="meal/[id]"
        options={{
          headerTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
