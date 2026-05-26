import { formatNumber } from "@/helper/helper";
import { colors } from "@/styles/global";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type Props = {
  current: number;
  goal: number;
  containerStyle?: ViewStyle;
};

const ProgressBar = ({ current, goal, containerStyle }: Props) => {
  const percentage = (current / goal) * 100;
  return (
    <View style={[containerStyle]}>
      <AnimatedCircularProgress
        size={100}
        width={10}
        fill={percentage}
        tintColor={colors.primaryOnDark}
        backgroundColor={colors.textMuted}
        rotation={0}
      >
        {() => (
          <View style={styles.textContainer}>
            <Text style={{ color: colors.text, fontWeight: "bold" }}>
              {formatNumber(current)}
            </Text>
            <Text style={{ color: colors.textMuted, fontWeight: "light" }}>
              / {formatNumber(goal)}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "column",
    gap: 2,
  },
  mainText: {
    color: colors.text,
    fontSize: 12,
  },
  fillText: {
    color: colors.textMuted,
    fontSize: 8,
  },
});
