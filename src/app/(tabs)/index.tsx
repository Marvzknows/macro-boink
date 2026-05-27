import Header from "@/components/header";
import CalorieTracker from "@/components/home-components/calorie-tracker";
import MacroBar from "@/components/home-components/macro-bar";
import ProgressBar from "@/components/home-components/progress-bar";
import { getFormattedDate } from "@/helper/helper";
import { colors, globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 18 }}>
        <Text style={{ color: colors.textMuted, marginBottom: 10 }}>
          {getFormattedDate()}
        </Text>
        <Header title="Good morning, Marvin" />

        <View style={[globalStyles.cardContainer]}>
          <ProgressBar current={1450} goal={2200} />
          <CalorieTracker calorieLef={750} />
        </View>

        <View style={styles.macroBarContainer}>
          <MacroBar
            label="Protein"
            current={98}
            max={150}
            color={colors.protein}
          />
          <MacroBar
            label="Carbs"
            current={175}
            max={250}
            color={colors.carbs}
          />
          <MacroBar label="Fat" current={42} max={70} color={colors.fat} />
        </View>

        <View style={styles.recentMealHeader}>
          <Header
            title="Recent meals"
            textStyle={{ fontSize: 24 }}
            style={{ marginBottom: 0 }}
          />
          <Link href={"/(tabs)/meals"}>
            <Text
              style={{ color: colors.protein, fontWeight: "700", fontSize: 18 }}
            >
              See All
            </Text>
          </Link>
        </View>

        {/* first 5 recent meals list */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  macroBarContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: colors.border,
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  recentMealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
