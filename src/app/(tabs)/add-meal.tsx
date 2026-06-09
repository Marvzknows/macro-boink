import { colors } from "@/styles/global";
import Header from "@/components/header";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import Toast from "react-native-toast-message";
import useMeals from "@/hooks/useMeals";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

const MEAL_TYPES: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snack"];

const AddMeal = () => {
  const {
    caloriesParams,
    carbsParams,
    proteinParams,
    fatParams,
    mealNameParams,
  } = useLocalSearchParams<{
    caloriesParams?: string;
    carbsParams?: string;
    proteinParams?: string;
    fatParams?: string;
    mealNameParams?: string;
  }>();

  const { createMeal } = useMeals();
  const [mealName, setMealName] = useState(mealNameParams ?? "");
  const [mealType, setMealType] = useState<MealType | "">("");
  const [calories, setCalories] = useState(caloriesParams ?? "");
  const [protein, setProtein] = useState(proteinParams ?? "");
  const [carbs, setCarbs] = useState(carbsParams ?? "");
  const [fat, setFat] = useState(fatParams ?? "");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const inset = useSafeAreaInsets();
  const router = useRouter();

  const resetForm = () => {
    setMealName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setNotes("");
    setMealType("");
  };

  const handleSave = async () => {
    if (!mealName.trim()) {
      Toast.show({
        type: "error",
        text1: "Meal name is required",
        text2: "Please enter a name for your meal.",
      });
      return;
    }

    try {
      setSaving(true);
      await createMeal({
        meal_name: mealName,
        meal_type: mealType,
        calories: calories ? Number(calories) : undefined,
        protein: protein ? Number(protein) : undefined,
        carbs: carbs ? Number(carbs) : undefined,
        fat: fat ? Number(fat) : undefined,
        notes: notes ?? "",
      });
      Toast.show({
        type: "success",
        text1: "Meal saved!",
      });
      resetForm();
      router.push("/(tabs)");
    } catch (error) {
      Toast.show({ type: "error", text1: "Failed to save meal" });
      console.error("Error saving meal", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        paddingTop: inset.top,
        // paddingBottom: 32 + inset.bottom,
      }}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Header title="Add meal" />
          <TouchableOpacity
            onPress={() => router.push("/camera-scan")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: colors.surface,
              borderWidth: 2,
              borderColor: colors.border,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Ionicons name="camera" size={18} color={colors.primary} />
            <Text
              style={{ color: colors.primary, fontWeight: "700", fontSize: 13 }}
            >
              Scan food
            </Text>
          </TouchableOpacity>
        </View>

        {/* Meal name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Meal name</Text>
          <TextInput
            value={mealName}
            onChangeText={setMealName}
            placeholder="Enter meal name"
            style={styles.input}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Meal type */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Meal type</Text>
          <View style={styles.pillRow}>
            {MEAL_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setMealType(type)}
                style={[styles.pill, mealType === type && styles.pillActive]}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.pillText,
                    mealType === type && styles.pillTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Calories */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Calories (kcal)</Text>
          <TextInput
            value={calories}
            onChangeText={setCalories}
            placeholder="0"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Macros */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Macros (grams)</Text>
          <View style={styles.macroRow}>
            <View style={styles.macroCard}>
              <Text style={[styles.macroLabel, { color: colors.protein }]}>
                PROTEIN
              </Text>
              <TextInput
                value={protein}
                onChangeText={(text) => {
                  const numbersOnly = text.replace(/[^0-9]/g, "");
                  setProtein(numbersOnly);
                }}
                placeholder="0"
                keyboardType="numeric"
                style={styles.macroInput}
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={styles.macroCard}>
              <Text style={[styles.macroLabel, { color: colors.carbs }]}>
                CARBS
              </Text>
              <TextInput
                value={carbs}
                onChangeText={(text) => {
                  const numbersOnly = text.replace(/[^0-9]/g, "");
                  setCarbs(numbersOnly);
                }}
                placeholder="0"
                keyboardType="numeric"
                style={styles.macroInput}
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={styles.macroCard}>
              <Text style={[styles.macroLabel, { color: colors.fat }]}>
                FAT
              </Text>
              <TextInput
                value={fat}
                onChangeText={(text) => {
                  const numbersOnly = text.replace(/[^0-9]/g, "");
                  setFat(numbersOnly);
                }}
                placeholder="0"
                keyboardType="numeric"
                style={styles.macroInput}
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Add a note..."
            multiline
            numberOfLines={3}
            style={[styles.input, styles.notesInput]}
            placeholderTextColor={colors.textMuted}
            textAlignVertical="top"
          />
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? "Saving..." : "Save meal"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddMeal;

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 10,
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
    fontSize: 16,
  },
  notesInput: {
    minHeight: 80,
    fontWeight: "500",
    fontSize: 14,
  },

  // Meal type pills
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  pillActive: {
    backgroundColor: "#742D17BF",
    borderColor: "#742D17BF",
  },
  pillText: {
    color: colors.textMuted,
    fontWeight: "600",
    fontSize: 14,
  },
  pillTextActive: {
    color: colors.primary,
  },

  // Macro cards
  macroRow: {
    flexDirection: "row",
    gap: 10,
  },
  macroCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 6,
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  macroInput: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    padding: 0, // remove default Android padding
  },

  // Save button
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
