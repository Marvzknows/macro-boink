import Preferences from "@/components/settings/preferences";
import { useAuth } from "@/context/AuthContext";
import { colors } from "@/styles/global";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { session, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        {session?.user?.email ? (
          <Text style={styles.email}>Signed in as {session.user.email}</Text>
        ) : null}

        <View style={{ flexDirection: "column", gap: 4, marginBottom: 14 }}>
          <Text style={styles.textHeader}>PREFERENCES</Text>
          <Preferences />
        </View>

        <Pressable
          onPress={signOut}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>SIGN OUT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  email: {
    color: colors.textMuted,
    fontSize: 14,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  textHeader: {
    color: colors.textMuted,
    fontWeight: "700",
  },
});
