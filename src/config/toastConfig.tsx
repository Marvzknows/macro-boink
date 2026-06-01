import { colors } from "@/styles/global";
import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";

const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      // plain style
      //   style={{
      //     borderLeftWidth: 0,
      //     backgroundColor: colors.surface,
      //     borderRadius: 12,
      //   }}
      style={{
        borderLeftColor: colors.primary,
        borderLeftWidth: 5,
        backgroundColor: colors.surface,
        borderRadius: 12,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ color: colors.text, fontWeight: "700", fontSize: 14 }}
      text2Style={{ color: colors.textMuted, fontSize: 12 }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: colors.primary,
        backgroundColor: colors.surface,
        borderRadius: 12,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ color: colors.text, fontWeight: "700", fontSize: 14 }}
      text2Style={{ color: colors.textMuted, fontSize: 12 }}
    />
  ),
};

export default toastConfig;
