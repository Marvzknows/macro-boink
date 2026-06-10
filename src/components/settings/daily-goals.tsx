import { colors } from "@/styles/global";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Divider from "./divider";

type DailyGoalsButtonProps = {
  title: string;
  value: string;
};

const DailyGoalsButton = ({ title, value }: DailyGoalsButtonProps) => {
  return (
    <TouchableOpacity style={styles.layer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DailyGoals = () => {
  return (
    <View style={styles.container}>
      <DailyGoalsButton title="Calories" value="12" />
      <Divider />
      <DailyGoalsButton title="Carbs" value="12" />
      <Divider />
      <DailyGoalsButton title="Protein" value="12" />
      <Divider />
      <DailyGoalsButton title="Fat" value="12" />
    </View>
  );
};

export default DailyGoals;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.border,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
  layer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  value: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: "700",
  },
});
