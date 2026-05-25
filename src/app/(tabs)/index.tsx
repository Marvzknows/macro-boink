import { colors, globalStyles } from "@/styles/global";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

export default function Home() {
  return (
    <ScrollView style={globalStyles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.fat,
        }}
      >
        <Text>LETS GO</Text>
      </TouchableOpacity>
      <Text
        style={{
          color: "red",
          paddingTop: 20,
        }}
      >
        LETS GO lorem800
      </Text>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "#DDDDDD",
//     padding: 10,
//   },
// });
