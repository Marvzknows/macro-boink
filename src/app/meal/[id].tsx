import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function MealDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Meal ID: {id}</Text>
    </View>
  );
}
