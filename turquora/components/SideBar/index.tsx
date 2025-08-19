import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SidebarProps = {
  onNavigate?: (route: string) => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: "home-outline", label: "Home", route: "home" },
    { icon: "arrow-up-outline", label: "Popular", route: "popular", beta: false},
    { icon: "search-outline", label: "Explore", route: "explore" },
    { icon: "stats-chart-outline", label: "All", route: "all" },
  ];

  return (
    <View style={[styles.sidebar, collapsed && styles.sidebarCollapsed]}>
      {/* Hamburger toggle */}
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => setCollapsed(!collapsed)}
      >
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Menu items */}
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.menuItem}
          onPress={() => onNavigate?.(item.route)}
        >
          <Ionicons name={item.icon as any} size={22} color="#fff" />
          {!collapsed && (
            <Text style={styles.menuLabel}>
              {item.label}{" "}
              {item.beta && <Text style={styles.beta}>BETA</Text>}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: "#111",
    paddingTop: 40,
    paddingHorizontal: 12,
    width: 200,
    borderRightWidth: 1,
    borderRightColor: "#333",
    position: "relative",
  },
  sidebarCollapsed: {
    width: 60,
  },
  toggle: {
    position: "absolute",
    top: 30, // distance from top of sidebar
    right: -20, // push the icon out onto the line
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  menuLabel: {
    color: "#fff",
    fontSize: 16,
  },
  beta: {
    color: "red",
    fontSize: 12,
  },
});
