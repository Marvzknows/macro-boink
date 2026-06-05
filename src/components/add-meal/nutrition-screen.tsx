import { NutritionResult } from "@/app/camera-scan";
import { Image } from "expo-image";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MacroCard from "./macro-card";

type Props = {
  uri: string;
  result: NutritionResult;
  onRetake: () => void;
};

const NutritionScreen = ({ uri, result, onRetake }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0a0a0f" }}
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom + 24 }}
    >
      {/* Image */}
      <Image
        source={{ uri }}
        style={{ width: "100%", height: 260 }}
        contentFit="cover"
      />

      {/* Food name */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20, gap: 12 }}>
        <Text style={n.foodName}>{result.food}</Text>
        <Text style={n.summary}>{result.summary}</Text>

        {/* Macro cards */}
        <View style={n.macroRow}>
          <MacroCard
            label="Calories"
            value={result.calories}
            unit="kcal"
            color="#f97316"
          />
          <MacroCard
            label="Protein"
            value={result.protein}
            unit="g"
            color="#3b82f6"
          />
        </View>
        <View style={n.macroRow}>
          <MacroCard
            label="Carbs"
            value={result.carbs}
            unit="g"
            color="#22c55e"
          />
          <MacroCard label="Fat" value={result.fat} unit="g" color="#eab308" />
        </View>

        <Text style={n.disclaimer}>
          * Estimates based on visual analysis. Actual values may vary.
        </Text>

        <TouchableOpacity style={n.retakeBtn} onPress={onRetake}>
          <Text style={n.retakeBtnText}>Scan Another</Text>
        </TouchableOpacity>
        <TouchableOpacity style={n.retakeBtn}>
          <Text style={n.retakeBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NutritionScreen;

const n = StyleSheet.create({
  foodName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 6,
  },
  summary: {
    color: "#888",
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  macroRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  macroCard: {
    flex: 1,
    backgroundColor: "#14131e",
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
  },
  macroLabel: {
    color: "#666",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  macroValue: {
    fontSize: 24,
    fontWeight: "800",
  },
  macroUnit: {
    color: "#666",
    fontSize: 13,
  },
  disclaimer: {
    color: "#444",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 28,
    fontStyle: "italic",
  },
  retakeBtn: {
    backgroundColor: "#3b82f6",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  retakeBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
