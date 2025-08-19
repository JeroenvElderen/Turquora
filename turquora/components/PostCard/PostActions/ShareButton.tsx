import { TouchableOpacity, StyleSheet, Text, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ensureUser from "./ensureUser";

interface Props {
  postUrl: string;
}

export default function ShareButton({ postUrl }: Props) {
  const handlePress = async () => {
    const user = await ensureUser();
    if (!user) return;
    if (postUrl) {
      try {
        await Share.share({ message: postUrl });
      } catch (e) {
        console.log("Error sharing", e);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.actionGroup} onPress={handlePress}>
      <Ionicons name="share-outline" size={14} color="#d7dadc" />
      <Text style={styles.actionText}>Share</Text>
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