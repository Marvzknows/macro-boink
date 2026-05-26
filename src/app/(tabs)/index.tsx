import Header from "@/components/header";
import { getFormattedDate } from "@/helper/helper";
import { colors } from "@/styles/global";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 18 }}>
        <Text style={{ color: colors.textMuted, marginBottom: 10 }}>
          {getFormattedDate()}
        </Text>

        <Header title="Good morning, Marvin" />

        <Text style={{ color: colors.text, fontSize: 2, fontWeight: "bold" }}>
          Good morning, Alex
        </Text>
        <Text
          style={{
            color: colors.textMuted,
            borderColor: "red",
            borderWidth: 1,
          }}
        >
          laawfasfa Lorem ipsum dolor sit amet consectetur adipisicing elit. Au
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
