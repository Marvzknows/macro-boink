import { colors } from "@/styles/global";
import Header from "@/components/header";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddMeal = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg, paddingHorizontal: 18 }}
    >
      <Header title="Add Meal" />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Meal name</Text>
        <TextInput
          placeholder="Enter meal name"
          style={styles.input}
          placeholderTextColor={colors.textMuted}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMeal;

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.text,
    fontWeight: "700",
    fontSize: 14,
  },
});
