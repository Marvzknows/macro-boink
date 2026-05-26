import { getFormattedDate } from "@/helper/helper";
import { colors, globalStyles } from "@/styles/global";
import { Text, ScrollView } from "react-native";

export default function Home() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={{ color: colors.textMuted }}>{getFormattedDate()}</Text>
    </ScrollView>
  );
}
