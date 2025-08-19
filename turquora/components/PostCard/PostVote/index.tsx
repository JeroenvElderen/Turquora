import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function PostVote({ score }: { score: number }) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  const handleUpvote = () => setVote(vote === "up" ? null : "up");
  const handleDownvote = () => setVote(vote === "down" ? null : "down");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleUpvote}>
        <Ionicons
          name={vote === "up" ? "arrow-up" : "arrow-up-outline"}
          size={20}
          color={vote === "up" ? "#FF4500" : "#ccc"}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.score,
          vote === "up" && { color: "#FF4500" },
          vote === "down" && { color: "#7193FF" },
        ]}
      >
        {score + (vote === "up" ? 1 : vote === "down" ? -1 : 0)}
      </Text>

      <TouchableOpacity onPress={handleDownvote}>
        <Ionicons
          name={vote === "down" ? "arrow-down" : "arrow-down-outline"}
          size={20}
          color={vote === "down" ? "#7193FF" : "#ccc"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#2a2a2b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  score: {
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 4,
  },
});
