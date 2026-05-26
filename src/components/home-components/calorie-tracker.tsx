import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  calorieLef: number;
};

export default function CalorieTracker({ calorieLef }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.calories}>Calories</Text>
      <Text style={styles.calorieLeft}>{calorieLef} kcal left</Text>

      <View style={styles.track}>
        <Ionicons name="trending-up" size={18} color={colors.success} />
        <Text style={styles.trackText}>On track</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 2,
    // borderWidth: 1,
    // borderColor: "red",
  },

  calories: {
    color: colors.textMuted,
    fontSize: 16,
  },

  calorieLeft: {
    fontWeight: "bold",
    color: colors.text,
    fontSize: 26,
  },

  track: {
    flexDirection: "row",
    alignItems: "center",
  },

  trackText: {
    marginLeft: 6, // 👈 this is your "gap"
    color: colors.success,
    fontWeight: "bold",
    fontSize: 16,
  },
});
