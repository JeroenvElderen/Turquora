import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VoteButton, CommentButton, ShareButton} from "../PostActions";
type Props = {
  score: number;
  commentsCount?: number;
  postId: string;
  postUrl?: string | null;
};

export default function PostFooter({ 
  score, 
  commentsCount = 0, 
  postId,
  postUrl = "",
}: Props) {
  return (
    <View style={styles.container}>
      {/* Votes */}
      <VoteButton postId={postId} score={score} />

      {/* Comments */}
      <CommentButton
        postId={postId}
        commentsCount={commentsCount} />

      {/* Award */}
      <View style={styles.actionGroup}>
        <Ionicons name="ribbon-outline" size={14} color="#d7dadc" />
      </View>

      {/* Share */}
      <ShareButton postUrl={postUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 8,
  },
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
