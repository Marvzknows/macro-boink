import { colors } from "@/styles/global";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Divider from "./divider";
import { useCallback, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import type { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpen = useCallback(() => {
    console.log("OPEN");
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <DailyGoalsButton
        title="Calories"
        value="2000"
        unit="kcal"
        onPress={handleOpen}
      />
      <Divider />
      <DailyGoalsButton
        title="Carbs"
        value="250"
        unit="g"
        onPress={handleOpen}
      />
      <Divider />
      <DailyGoalsButton
        title="Protein"
        value="150"
        unit="g"
        onPress={handleOpen}
      />
      <Divider />
      <DailyGoalsButton title="Fat" value="65" unit="g" onPress={handleOpen} />

      {/* ======== MODAL SHEET ======== */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        // onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={modalStyles.sheetBackground}
        handleIndicatorStyle={modalStyles.handle}
      >
        <BottomSheetView style={modalStyles.contentContainer}>
          {/* Header */}
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>Set Goal</Text>
            <Text style={modalStyles.subtitle}>Enter your daily target</Text>
          </View>

          <Divider />

          {/* Input area — wire this up when ready */}
          <View style={modalStyles.inputRow}>
            <Text style={modalStyles.inputPlaceholder}>0</Text>
            <Text style={modalStyles.unitLabel}>kcal</Text>
          </View>

          <Divider />

          {/* Actions */}
          <View style={modalStyles.buttonRow}>
            <TouchableOpacity
              style={[modalStyles.btn, modalStyles.btnCancel]}
              onPress={() => bottomSheetModalRef.current?.dismiss()}
              activeOpacity={0.7}
            >
              <Text style={modalStyles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[modalStyles.btn, modalStyles.btnSave]}
              activeOpacity={0.7}
            >
              <Text style={modalStyles.btnSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
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

const modalStyles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: colors.surface,
  },
  handle: {
    backgroundColor: colors.border,
    width: 40,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    paddingTop: 4,
    gap: 4,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "400",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  inputPlaceholder: {
    color: colors.textMuted,
    fontSize: 40,
    fontWeight: "700",
  },
  unitLabel: {
    color: colors.textMuted,
    fontSize: 18,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnCancel: {
    backgroundColor: colors.border,
  },
  btnCancelText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  btnSave: {
    backgroundColor: colors.primary,
  },
  btnSaveText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
});
