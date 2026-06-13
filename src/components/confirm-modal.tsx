import { colors } from "@/styles/global";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import type { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Divider from "./settings/divider";

type Props = {
  ref: React.RefObject<BottomSheetModal | null>;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
};

const ConfirmModal = ({
  ref,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
}: Props) => {
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
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView
        style={[styles.contentContainer, { paddingBottom: 32 + insets.bottom }]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{message}</Text>
        </View>

        <Divider />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnCancel]}
            onPress={() => ref.current?.dismiss()}
            activeOpacity={0.7}
          >
            <Text style={styles.btnCancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnDanger]}
            activeOpacity={0.7}
            onPress={() => {
              onConfirm();
              ref.current?.dismiss();
            }}
          >
            <Text style={styles.btnDangerText}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
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
  btnDanger: {
    backgroundColor: "#D85A3022", // primary at low opacity, or use a red
  },
  btnDangerText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700",
  },
});
