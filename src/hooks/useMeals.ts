import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { randomUUID } from "expo-crypto";

const STORAGE_KEY = "meals";

export type Meal = {
  id: string;
  meal_name: string;
  meal_type: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  notes?: string;
  created_at: string;
};

type MealPayloadT = Omit<Meal, "id" | "created_at">;

const useMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  // Read
  const getMeals = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      setMeals(raw ? JSON.parse(raw) : []);
    } catch (error) {
      console.error("Error fetching meals:", error);
      throw error;
    }
  };

  // Create
  const createMeal = async (input: MealPayloadT) => {
    try {
      const newMeal: Meal = {
        ...input,
        id: randomUUID(),
        created_at: new Date().toISOString(),
      };

      const updatedMeals = [...meals, newMeal];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
      return newMeal;
    } catch (error) {
      console.error("Error adding meals:", error);
      throw error;
    }
  };

  // Update
  const updateMeal = async (mealId: string, input: MealPayloadT) => {
    try {
      const mealExist = meals.find((m) => m.id === mealId);

      if (!mealExist) {
        throw new Error("Meal not found");
      }

      const updatedMeals = meals.map((m) =>
        m.id === mealId
          ? {
              ...m,
              ...input,
            }
          : m,
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
      return updatedMeals.find((m) => m.id === mealId);
    } catch (error) {
      console.error("Error updating meals:", error);
      throw error;
    }
  };

  // Delete
  const deleteMeal = async (mealId: string) => {
    try {
      const mealExist = meals.find((m) => m.id === mealId);

      if (!mealExist) {
        throw new Error("Meal not found");
      }

      const updatedMeals = meals.filter((m) => m.id !== mealId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
    } catch (error) {
      console.error("Error deleting meals:", error);
      throw error;
    }
  };

  return {
    meals,
    getMeals,
    createMeal,
    updateMeal,
    deleteMeal,
  };
};

export default useMeals;
