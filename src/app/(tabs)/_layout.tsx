import { colors } from "@/styles/global";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.textMuted,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home-outline" : "home"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* #region COMMING SOON */}
      <Tabs.Screen
        name="meals"
        options={{
          href: null,
          title: "Meals",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "list-outline" : "list"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* #endregion */}
      <Tabs.Screen
        name="add-meal"
        options={{
          title: "Add",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "add-outline" : "add"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings-outline" : "settings"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
