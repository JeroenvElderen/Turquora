import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

type Props = {
  score: number;
  commentsCount?: number;
};

export default function PostFooter({ score, commentsCount = 0 }: Props) {
  return (
    <View style={styles.container}>
      {/* Votes */}
      <View style={styles.actionGroup}>
        <TouchableOpacity>
          <FontAwesome name="arrow-up" size={14} color="#d7dadc" />
        </TouchableOpacity>
        <Text style={styles.actionText}>{score}</Text>
        <TouchableOpacity>
          <FontAwesome name="arrow-down" size={14} color="#d7dadc" />
        </TouchableOpacity>
      </View>

      {/* Comments */}
      <View style={styles.actionGroup}>
        <Feather name="message-circle" size={14} color="#d7dadc" />
        <Text style={styles.actionText}>{commentsCount}</Text>
      </View>

      {/* Award */}
      <View style={styles.actionGroup}>
        <Feather name="award" size={14} color="#d7dadc" />
      </View>

      {/* Share */}
      <View style={styles.actionGroup}>
        <Feather name="share" size={14} color="#d7dadc" />
        <Text style={styles.actionText}>Share</Text>
      </View>
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
