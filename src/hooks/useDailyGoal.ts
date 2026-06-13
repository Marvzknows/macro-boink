import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type DailyGoalT = {
  kcal: string;
  carbs: string;
  protein: string;
  fat: string;
};

const useDailyGoal = () => {
  const DAILY_GOAL_STORAGE_KEY = "daily_goal";
  const [dailyGoal, setDailyGoal] = useState<DailyGoalT>({
    kcal: "",
    carbs: "",
    protein: "",
    fat: "",
  });

  const readDailyGoal = async () => {
    const storedGoal = await AsyncStorage.getItem(DAILY_GOAL_STORAGE_KEY);
    if (storedGoal) {
      setDailyGoal(JSON.parse(storedGoal));
    }
  };

  const resetDailyGoal = async () => {
    await AsyncStorage.setItem(
      DAILY_GOAL_STORAGE_KEY,
      JSON.stringify({ kcal: 0, carbs: 0, protein: 0, fat: 0 }),
    );
    setDailyGoal({
      kcal: "0",
      carbs: "0",
      protein: "0",
      fat: "0",
    });
  };

  const setDailyGoalValue = async (key: keyof DailyGoalT, value: string) => {
    setDailyGoal((prev) => {
      const updatedGoal = {
        ...prev,
        [key]: value,
      };

      AsyncStorage.setItem(DAILY_GOAL_STORAGE_KEY, JSON.stringify(updatedGoal));

      return updatedGoal;
    });
  };

  return {
    dailyGoal,
    readDailyGoal,
    setDailyGoal,
    resetDailyGoal,
    setDailyGoalValue,
  };
};

export default useDailyGoal;
