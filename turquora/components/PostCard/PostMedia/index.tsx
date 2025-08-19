import { View, Text, StyleSheet, Image } from "react-native";

export default function PostMedia({
  title,
  body,
  url,
}: {
  title: string;
  body?: string | null;
  url?: string | null;
}) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {url && url.match(/\.(jpeg|jpg|gif|png)$/) ? (
        <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
