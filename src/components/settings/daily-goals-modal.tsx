import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import type { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { colors } from "@/styles/global";
import Divider from "./divider";
import { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  ref: React.RefObject<BottomSheetModal | null>;
  unit: string;
  value: string;
  setValue: (value: string) => void;
  handleSave: () => void;
};

const DailyGoalsModal = ({ ref, unit, value, setValue, handleSave }: Props) => {
  const insets = useSafeAreaInsets();
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
    <BottomSheetModal
      ref={ref}
      // onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={modalStyles.sheetBackground}
      handleIndicatorStyle={modalStyles.handle}
    >
      <BottomSheetView
        style={[
          modalStyles.contentContainer,
          { paddingBottom: 32 + insets.bottom },
        ]}
      >
        {/* Header */}
        <View style={modalStyles.header}>
          <Text style={modalStyles.title}>Set Goal</Text>
          <Text style={modalStyles.subtitle}>Enter your daily target</Text>
        </View>

        <Divider />

        {/* Input area */}
        <View style={modalStyles.inputRow}>
          <BottomSheetTextInput
            value={value}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              setValue(numericValue);
            }}
            keyboardType="numeric"
            style={modalStyles.inputPlaceholder}
          />
          <Text style={modalStyles.unitLabel}>{unit}</Text>
        </View>

        <Divider />

        {/* Actions */}
        <View style={modalStyles.buttonRow}>
          <TouchableOpacity
            style={[modalStyles.btn, modalStyles.btnCancel]}
            onPress={() => ref.current?.dismiss()}
            activeOpacity={0.7}
          >
            <Text style={modalStyles.btnCancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[modalStyles.btn, modalStyles.btnSave]}
            activeOpacity={0.7}
            onPress={handleSave}
          >
            <Text style={modalStyles.btnSaveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default DailyGoalsModal;

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
    color: colors.text,
    fontSize: 40,
    fontWeight: "700",
    flex: 1,
    padding: 0,
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
