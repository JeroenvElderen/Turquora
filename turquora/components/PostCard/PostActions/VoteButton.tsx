import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ensureUser from "./ensureUser";
import { supabase } from "@/lib/supabase";

interface Props {
  postId: string;
  score: number;
}

export default function VoteButton({ postId, score }: Props) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  const handleUpvote = async () => {
   const user = await ensureUser();
    if (!user) return;

    if (vote === "up") {
      setVote(null);
      await supabase
        .from("votes_posts")
        .delete()
        .match({ post_id: postId, user_id: user.id });
    } else {
      setVote("up");
      await supabase.from("votes_posts").upsert({
        post_id: postId,
        user_id: user.id,
        value: 1,
      });
    }
  };

  const handleDownvote = async () => {
   const user = await ensureUser();
    if (!user) return;

    if (vote === "down") {
      setVote(null);
      await supabase
        .from("votes_posts")
        .delete()
        .match({ post_id: postId, user_id: user.id });
    } else {
      setVote("down");
      await supabase.from("votes_posts").upsert({
        post_id: postId,
        user_id: user.id,
        value: -1,
      });
    }
  };

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