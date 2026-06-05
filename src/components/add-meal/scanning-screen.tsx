import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const ScanningScreen = ({ uri }: { uri: string }) => {
  return (
    <View style={s.center}>
      <Image
        source={{ uri }}
        contentFit="contain"
        style={{
          width: 300,
          aspectRatio: 1,
          borderRadius: 16,
          marginBottom: 32,
        }}
      />
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={{ color: "#fff", marginTop: 16, fontSize: 16 }}>
        Analyzing food...
      </Text>
      {/* <Text style={{ color: "#666", marginTop: 6, fontSize: 13 }}>
        Powered by Gemini Flash
      </Text> */}
    </View>
  );
};

export default ScanningScreen;

const s = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});
