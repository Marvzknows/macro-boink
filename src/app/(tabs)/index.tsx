import Header from "@/components/header";
import CalorieTracker from "@/components/home-components/calorie-tracker";
import ProgressBar from "@/components/home-components/progress-bar";
import { getFormattedDate } from "@/helper/helper";
import { colors, globalStyles } from "@/styles/global";
import { Text, ScrollView, View } from "react-native";
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

        {/* other macro */}

        {/* recent meals (show first recent 5) */}
      </ScrollView>
    </SafeAreaView>
  );
}
