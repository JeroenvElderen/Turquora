import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  score: number;
};

export default function VoteColumn({ score }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesome name="arrow-up" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.score}>{score}</Text>
      <TouchableOpacity>
        <FontAwesome name="arrow-down" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
    width: 40, // fixed width like Reddit
  },
  button: {
    paddingVertical: 4,
  },
  score: {
    color: "#d7dadc",
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 4,
  },
});
