import { colors } from "@/styles/global";
import { View, Text, StyleSheet } from "react-native";

type MacroBarProps = {
  label: string;
  current: number;
  max: number;
  color: string;
};

const MacroBar = ({ label, current, max, color }: MacroBarProps) => {
  const percent = Math.min((current / max) * 100, 100);
  return (
    <View style={styles.row}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.values}>
          {current} / {max}g
        </Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percent}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

export default MacroBar;

const styles = StyleSheet.create({
  row: {
    gap: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  values: {
    color: colors.textMuted,
    fontSize: 13,
  },
  track: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: 8,
    borderRadius: 4,
  },
});
