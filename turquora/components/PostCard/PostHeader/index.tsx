import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
  community: string;
  author: string;
  createdAt: string;
  avatarUrl?: string | null;
};

export default function PostHeader({ community, author, createdAt, avatarUrl }: Props) {
  const timeAgo = "2h"; // TODO: convert createdAt to human-readable

  return (
    <View style={styles.container}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.placeholder]} />
      )}
      <Text style={styles.meta}>
        r/{community} • u/{author} • {timeAgo} ago
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  placeholder: {
    backgroundColor: "#444",
  },
  meta: {
    color: "#ccc",
    fontSize: 12,
  },
});
