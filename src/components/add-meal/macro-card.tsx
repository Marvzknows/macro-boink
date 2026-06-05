import { StyleSheet, Text, View } from "react-native";

const MacroCard = ({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
}) => {
  return (
    <View style={[n.macroCard, { borderLeftColor: color }]}>
      <Text style={n.macroLabel}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}>
        <Text style={[n.macroValue, { color }]}>{value}</Text>
        <Text style={n.macroUnit}>{unit}</Text>
      </View>
    </View>
  );
};

export default MacroCard;

const n = StyleSheet.create({
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
});
