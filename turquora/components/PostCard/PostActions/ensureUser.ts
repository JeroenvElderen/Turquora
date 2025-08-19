import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default async function ensureUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) return user;
  const { data } = await supabase.auth.signInAnonymously();
  return data.user ?? null;
}