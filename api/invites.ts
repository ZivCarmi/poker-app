import { supabase } from "~/lib/supabase";

export const fetchGroupByInviteToken = async (inviteToken: string) => {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("invite_token", inviteToken)
    .gt("invite_token_expires_at", new Date().toISOString())
    .single();

  if (error) throw new Error(error.message);

  return data;
};
