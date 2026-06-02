import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import uuid from "react-native-uuid";

export const STORAGE_KEY = "meals";

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
  const [loading, setLoading] = useState(false);

  // Read
  const getMeals = async () => {
    try {
      setLoading(true);
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      setMeals(raw ? JSON.parse(raw) : []);
    } catch (error) {
      console.error("Error fetching meals:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create
  const createMeal = async (input: MealPayloadT) => {
    try {
      // read existing from storage, not from state
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const existing: Meal[] = raw ? JSON.parse(raw) : [];

      const newMeal: Meal = {
        ...input,
        id: uuid.v4(),
        created_at: new Date().toISOString(),
      };

      const updatedMeals = [newMeal, ...existing];
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
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const existing: Meal[] = raw ? JSON.parse(raw) : [];

      const mealExist = existing.find((m) => m.id === mealId);
      if (!mealExist) throw new Error("Meal not found");

      const updatedMeals = existing.map((m) =>
        m.id === mealId ? { ...m, ...input } : m,
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
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const existing: Meal[] = raw ? JSON.parse(raw) : [];

      const mealExist = meals.find((m) => m.id === mealId);
      if (!mealExist) throw new Error("Meal not found");

      const updatedMeals = existing.filter((m) => m.id !== mealId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
    } catch (error) {
      console.error("Error deleting meals:", error);
      throw error;
    }
  };

  // clear all meal
  const clearAllMeals = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      setMeals([]);
    } catch (error) {
      console.error("Error updating meals:", error);
      throw error;
    }
  };

  return {
    loading,
    meals,
    getMeals,
    createMeal,
    updateMeal,
    deleteMeal,
    clearAllMeals,
  };
};

export default useMeals;
