import Header from "@/components/header";
import CalorieTracker from "@/components/home-components/calorie-tracker";
import MacroBar from "@/components/home-components/macro-bar";
import ProgressBar from "@/components/home-components/progress-bar";
import RecentMealCard from "@/components/home-components/recent-meal-card";
import { getFormattedDate } from "@/helper/helper";
import useMeals from "@/hooks/useMeals";
import { colors, globalStyles } from "@/styles/global";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { meals, getMeals, loading: fetchinMeals } = useMeals();

  useFocusEffect(
    useCallback(() => {
      getMeals();
    }, []),
  );

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
        <View style={styles.recentMealsContainer}>
          {fetchinMeals ? (
            <ActivityIndicator color={colors.primary} />
          ) : meals.length ? (
            meals
              .slice(0, 5)
              .map((meal) => (
                <RecentMealCard
                  key={meal.id}
                  id={meal.id}
                  title={meal.meal_name}
                  time={meal.created_at}
                  calories={meal.calories ?? 0}
                />
              ))
          ) : (
            <Text style={{ color: colors.textMuted }}>No recent meals</Text>
          )}
        </View>
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
    marginBottom: 16,
  },
  recentMealsContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
