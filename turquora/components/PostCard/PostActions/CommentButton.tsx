import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ensureUser from "./ensureUser";

interface Props {
  postId: string;
  commentsCount: number;
}

export default function CommentButton({ postId, commentsCount }: Props) {
  const handlePress = async () => {
    const user = await ensureUser();
    if (!user) return;
    // TODO: navigate to comments screen
    console.log("Open comments for", postId);
  };

  return (
    <TouchableOpacity style={styles.actionGroup} onPress={handlePress}>
      <Ionicons name="chatbubble-outline" size={14} color="#d7dadc" />
      <Text style={styles.actionText}>{commentsCount}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#272729",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionText: {
    color: "#d7dadc",
    fontSize: 12,
    fontWeight: "500",
  },
});