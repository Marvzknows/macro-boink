import { AuthProvider, useAuth } from "@/context/AuthContext";
import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

function RootLayoutNav() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bg,
        }}
      >
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }

  const isAuthed = !!session;

  return (
    <Stack>
      <Stack.Protected guard={!isAuthed}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isAuthed}>
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
      </Stack.Protected>
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
