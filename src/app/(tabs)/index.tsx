import Header from "@/components/header";
import CalorieTracker from "@/components/home-components/calorie-tracker";
import MacroBar from "@/components/home-components/macro-bar";
import ProgressBar from "@/components/home-components/progress-bar";
import { getFormattedDate } from "@/helper/helper";
import { colors, globalStyles } from "@/styles/global";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 18 }}>
        <Text style={{ color: colors.textMuted, marginBottom: 10 }}>
          {getFormattedDate()}
        </Text>
        <Header title="Good morning, Marvin" />

        <View style={[globalStyles.cardContainer]}>
          <ProgressBar current={1450} goal={2200} />
          <CalorieTracker calorieLef={750} />
        </View>

        <View style={styles.macroBarContainer}>
          <MacroBar
            label="Protein"
            current={98}
            max={150}
            color={colors.protein}
          />
          <MacroBar
            label="Carbs"
            current={175}
            max={250}
            color={colors.carbs}
          />
          <MacroBar label="Fat" current={42} max={70} color={colors.fat} />
        </View>

        {/* recent meals (show first recent 5) */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  macroBarContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: colors.border,
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
});
