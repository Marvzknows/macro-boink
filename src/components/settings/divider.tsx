import { colors } from "@/styles/global";
import { View } from "react-native";

const Divider = () => (
  <View
    style={{
      height: 0.3,
      backgroundColor: colors.textMuted,
      marginHorizontal: 8,
    }}
  />
);

export default Divider;
