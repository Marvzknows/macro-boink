import toastConfig from "@/config/toastConfig";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

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
        <Stack.Screen
          name="camera-scan"
          options={{
            headerTitle: "Scan Food",
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
  const insets = useSafeAreaInsets();

  return (
    <AuthProvider>
      <RootLayoutNav />
      <Toast config={toastConfig} topOffset={insets.top + 10} />
    </AuthProvider>
  );
}
