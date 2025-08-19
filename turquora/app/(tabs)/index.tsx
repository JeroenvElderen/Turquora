import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import PostCard from "@/components/PostCard";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/SideBar";

type Profile = {
  id: string;
  handle: string;
  avatar_url?: string | null;
};

type Post = {
  id: string;
  title: string;
  body?: string | null;
  url?: string | null;
  score: number;
  created_at: string;
  author_id: string;
  communities?: { name: string } | null;
  profiles?: Profile | null;
};

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const fetchPosts = useCallback(async () => {
    try {
      // Step 1: Get posts
      const { data: postData, error: postError } = await supabase
        .from("posts_ranked")
        .select(`
          id, title, body, url, score, created_at, author_id,
          communities(name)
        `)
        .order("hot_score", { ascending: false })
        .limit(50);

      if (postError) {
        console.error("Error fetching posts:", postError);
        return;
      }

      if (!postData || postData.length === 0) {
        setPosts([]);
        return;
      }

      // Step 2: Get all unique author IDs
      const authorIds = [...new Set(postData.map((p) => p.author_id))];

      // Step 3: Fetch profiles for these authors
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, handle, avatar_url")
        .in("id", authorIds);

      if (profileError) {
        console.error("Error fetching profiles:", profileError);
      }

      // Step 4: Merge posts with profiles
      const mergedPosts: Post[] = postData.map((post) => ({
        ...post,
        profiles:
          profileData?.find((profile) => profile.id === post.author_id) || null,
      }));

      setPosts(mergedPosts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, [fetchPosts]);

  if (loading) return <View style={{ flex: 1, backgroundColor: "#000" }} />;

  return (
    <View style={styles.page}>
      {isDesktop && (
        <Sidebar onNavigate={(route) => console.log("Navigate to", route)} />
      )}

      <View style={[styles.feedWrapper, isDesktop && styles.feedWrapperDesktop]}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              id={item.id}
              community={item.communities?.name ?? "unknown"}
              author={item.profiles?.handle ?? "unknown"}
              avatarUrl={item.profiles?.avatar_url ?? null}
              title={item.title}
              body={item.body}
              url={item.url}
              score={item.score}
              createdAt={item.created_at}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000",
  },
  feedWrapper: {
    flex: 1,
    paddingHorizontal: 0,
  },
  feedWrapperDesktop: {
    alignItems: "center",
  },
});
