import { StyleSheet } from "react-native";

export const colors = {
  bg: "#18181A",
  surface: "#232326",
  border: "#2F2F33",
  text: "#F5F5F4",
  textMuted: "#8A8A87",
  primary: "#D85A30",
  primaryOnDark: "#F0997B",
  protein: "#85B7EB",
  carbs: "#FAC775",
  fat: "#C0DD97",
  success: "#4FB06D",
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  container: {
    // flex: 1,
    backgroundColor: colors.bg,
    // paddingTop: 60,
    paddingHorizontal: 18,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.border,
    paddingVertical: 18,
    borderRadius: 16,
  },
});
