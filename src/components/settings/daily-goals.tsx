import { colors } from "@/styles/global";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Divider from "./divider";
import { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DailyGoalsModal from "./daily-goals-modal";
import useDailyGoal, { DailyGoalT } from "@/hooks/useDailyGoal";

type DailyGoalsButtonProps = {
  title: string;
  value: string;
  unit: string;
  onPress: () => void;
};

const DailyGoalsButton = ({
  title,
  value,
  unit,
  onPress,
}: DailyGoalsButtonProps) => {
  return (
    <TouchableOpacity style={styles.layer} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.value}>
          {value}
          <Text style={styles.unit}> {unit}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const DailyGoals = () => {
  const [unit, setUnit] = useState<keyof DailyGoalT>("kcal");
  const [value, setValue] = useState("");
  const { dailyGoal, readDailyGoal, setDailyGoalValue } = useDailyGoal();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpen = useCallback((unit: keyof DailyGoalT, value: string) => {
    setUnit(unit);
    setValue(value);
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    readDailyGoal();
  }, []);

  const handleSave = async () => {
    await setDailyGoalValue(unit, value);
    setValue("");
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <View style={styles.container}>
      <DailyGoalsButton
        title="Calories"
        value={dailyGoal.kcal ?? "0"}
        unit="kcal"
        onPress={() => handleOpen("kcal", dailyGoal.kcal ?? "0")}
      />
      <Divider />
      <DailyGoalsButton
        title="Carbs"
        value={dailyGoal.carbs ?? "0"}
        unit="g"
        onPress={() => handleOpen("carbs", dailyGoal.carbs ?? "0")}
      />
      <Divider />
      <DailyGoalsButton
        title="Protein"
        value={dailyGoal.protein ?? "0"}
        unit="g"
        onPress={() => handleOpen("protein", dailyGoal.protein ?? "0")}
      />
      <Divider />
      <DailyGoalsButton
        title="Fat"
        value={dailyGoal.fat ?? "0"}
        unit="g"
        onPress={() => handleOpen("fat", dailyGoal.fat ?? "0")}
      />

      {/* ======== MODAL SHEET ======== */}
      <DailyGoalsModal
        ref={bottomSheetModalRef}
        unit={unit}
        value={value}
        setValue={setValue}
        handleSave={handleSave}
      />
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
  unit: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "400",
  },
});
