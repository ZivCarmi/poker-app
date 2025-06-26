import { GroupDataWithCreatedBy } from "~/components/NewGroupForm";
import { supabase } from "~/lib/supabase";

export const joinGroup = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("group_members")
    .insert({ group_id: groupId, user_id: userId })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchUserGroups = async (userId?: string) => {
  const { data, error } = await supabase
    .from("group_members")
    .select(
      `
      group_id,
      ...group_id (
        name
      )
      `
    )
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const fetchGroup = async (groupId: string) => {
  const { data, error } = await supabase
    .from("groups")
    .select(
      `
      *,
      meetings (
        id, created_by, title, description, location, date, status,
        meeting_participants (
          user_id,
          ...users (
            username,
            avatar_url
          )
        )
      )
      `
    )
    .eq("id", groupId)
    .order("date", { referencedTable: "meetings" })
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const createGroup = async ({
  name,
  createdBy,
}: GroupDataWithCreatedBy) => {
  const { data, error } = await supabase
    .from("groups")
    .insert([{ name, created_by: createdBy }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const isUserInGroup = async (userId?: string, groupId?: string) => {
  const { count, error } = await supabase
    .from("group_members")
    .select("*", { count: "exact", head: true })
    .eq("group_id", groupId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return !!count;
};

export const fetchGroupByInviteToken = async (inviteToken: string) => {
  const { data, error } = await supabase
    .from("groups")
    .select(`*`)
    .eq("invite_token", inviteToken)
    .gt("invite_token_expires_at", new Date().toISOString())
    .single();

  if (error) throw new Error(error.message);

  return data;
};
