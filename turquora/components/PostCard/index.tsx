import { View, Text, Image, StyleSheet } from "react-native";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

type Props = {
  id: string;
  community: string;
  author: string;
  title: string;
  body?: string | null;
  url?: string | null;
  score: number;
  createdAt: string;
  avatarUrl?: string | null;
  commentsCount?: number;
};

export default function PostCard({
  id,
  community,
  author,
  title,
  body,
  url,
  score,
  createdAt,
  avatarUrl,
  commentsCount = 0,
}: Props) {
  return (
    <View style={styles.card}>
      <PostHeader
        community={community}
        author={author}
        createdAt={createdAt}
        avatarUrl={avatarUrl}
      />

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Body */}
      {body ? <Text style={styles.body}>{body}</Text> : null}

      {/* Image */}
      {url && url.match(/\.(jpeg|jpg|gif|png)$/) ? (
        <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
      ) : null}

      {/* Footer (votes + comments + award + share) */}
      <PostFooter score={score} commentsCount={commentsCount} postId={id} postUrl={url} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1b",
    marginVertical: 8,
    borderRadius: 6,
    overflow: "hidden",
    maxWidth: 2400,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  body: {
    color: "#ddd",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#000",
  },
});
