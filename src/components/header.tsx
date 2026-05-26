import { colors } from "@/styles/global";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";

type HeaderT = {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Header = ({ title, style, textStyle }: HeaderT) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },

  text: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 26,
  },
});
