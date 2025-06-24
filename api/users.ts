import { supabase } from "~/lib/supabase";

export const fetchUser = async (userId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
};
