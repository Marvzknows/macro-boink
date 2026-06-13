import { colors } from "@/styles/global";
import { StyleSheet, View } from "react-native";

const Divider = () => (
  <View
    style={{
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.textMuted,
      marginHorizontal: 8,
    }}
  />
);

export default Divider;
