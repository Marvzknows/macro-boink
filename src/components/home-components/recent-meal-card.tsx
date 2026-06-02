import { formatDateTime } from "@/helper/helper";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  id: string | number;
  title: string;
  time: string;
  calories: number;
};

const RecentMealCard = ({ id, title, time, calories }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => {
        router.push(`/meal/${id}`);
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>
          {formatDateTime(time)} - {calories} kcal
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </Pressable>
  );
};

export default RecentMealCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.border,
    borderRadius: 16,
    padding: 16,
  },

  pressed: {
    opacity: 0.7,
  },

  textContainer: {
    gap: 4,
  },

  title: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 14,
  },

  subtitle: {
    color: colors.textMuted,
    fontWeight: "600",
    fontSize: 12,
  },
});
