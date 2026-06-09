import { colors } from "@/styles/global";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Pressable,
  Platform,
  Modal,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker, {
  DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";

const Divider = () => (
  <View
    style={{
      borderTopWidth: 0.4,
      borderColor: colors.textMuted,
      marginHorizontal: 8,
    }}
  />
);

const Preferences = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [time, setTime] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date()); // iOS: hold until confirmed
  const [showPicker, setShowPicker] = useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  const openPicker = () => {
    setTempTime(time); // seed temp with current
    setShowPicker(true);
  };

  // // Android: fires once on confirm
  const handleAndroidChange = (
    _event: DateTimePickerChangeEvent,
    value?: Date,
  ) => {
    setShowPicker(false);
    if (value) setTime(value);
  };

  // iOS: fires on every scroll tick — just update temp
  const handleIOSChange = (_event: DateTimePickerChangeEvent, value?: Date) => {
    if (value) setTempTime(value);
  };

  const confirmIOS = () => {
    setTime(tempTime);
    setShowPicker(false);
  };

  const cancelIOS = () => setShowPicker(false);

  return (
    <View style={styles.container}>
      {/* Daily reminder toggle */}
      <View style={styles.layer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.text}
          />
          <Text style={styles.text}>Daily reminders</Text>
        </View>
        <Switch
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.text}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Divider />

      {/* Reminder time row — disabled when notifications are off */}
      <View style={[styles.layer, !isEnabled && { opacity: 0.4 }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="time-outline" size={24} color={colors.text} />
          <Text style={styles.text}>Reminder time</Text>
        </View>
        <Pressable onPress={openPicker} disabled={!isEnabled}>
          <Text
            style={{ color: colors.primary, fontSize: 16, fontWeight: "600" }}
          >
            {formatTime(time)}
          </Text>
        </Pressable>
      </View>

      {/* Android: renders inline */}
      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onValueChange={handleAndroidChange}
        />
      )}

      {/* iOS: modal with Cancel / Done buttons */}
      {Platform.OS === "ios" && (
        <Modal transparent visible={showPicker} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={cancelIOS}>
                  <Text style={{ color: colors.textMuted, fontSize: 16 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmIOS}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempTime}
                mode="time"
                is24Hour={false}
                display="spinner"
                onValueChange={handleIOSChange}
                textColor="white"
                // Style the container view wrapping the picker
                style={{
                  width: 200,
                  backgroundColor: "transparent",
                  marginHorizontal: "auto",
                }}
                // iOS-specific appearance
                themeVariant="dark" // "light" | "dark" — forces light/dark mode
                accentColor="red" // Changes the highlight/selection color (iOS only)
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.border,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  layer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 0.4,
    borderColor: "#444",
  },
});
