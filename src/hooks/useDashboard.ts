import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal, STORAGE_KEY } from "./useMeals";
import { useState } from "react";

type DashboardT = {
  calorie_count: number;
  protein_count: number;
  carbs_count: number;
  fat_count: number;
};

const useDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardT>({
    calorie_count: 0,
    protein_count: 0,
    carbs_count: 0,
    fat_count: 0,
  });
  const [loading, setLoading] = useState(false);

  const getTodayStats = async () => {
    try {
      setLoading(true);
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const meals: Meal[] = raw ? JSON.parse(raw) : [];

      const today = new Date().toDateString();

      const todayMeals = meals.filter((meal) => {
        return new Date(meal.created_at).toDateString() === today;
      });

      const stats = todayMeals.reduce(
        (acc, meal) => {
          acc.calorie_count += meal.calories ?? 0;
          acc.protein_count += meal.protein ?? 0;
          acc.carbs_count += meal.carbs ?? 0;
          acc.fat_count += meal.fat ?? 0;
          return acc;
        },
        {
          calorie_count: 0,
          protein_count: 0,
          carbs_count: 0,
          fat_count: 0,
        },
      );

      setDashboardStats(stats);
    } catch (error) {
      console.error("Error displaying stats", error);
      throw new Error("Error fetching stats");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getTodayStats,
    dashboardStats,
  };
};

export default useDashboard;
