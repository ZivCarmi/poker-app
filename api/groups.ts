import { GroupData } from "~/components/NewGroupForm";
import { LeaveGroupParams } from "~/hooks/useLeaveGroup";
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
      ...group_id (name)
      `
    )
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const fetchGroup = async (groupId: string) => {
  const { data, error, status } = await supabase
    .from("groups_with_members_count")
    .select(
      `
      id,
      name,
      created_by,
      created_at,
      invite_token,
      invite_token_expires_at,
      members_count,
      members:group_members (
        user_id,
        role,
        ...users (
          username,
          avatar_url
        )
      ),
      meetings:meetings_with_participant_count (
        id, created_by, title, description, location, date, status, participants_count,
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
    .order("date", { referencedTable: "meetings_with_participant_count" })
    .single();

  console.log({ status });

  if (error) throw new Error(error.message);

  return { group: data, status };
};

export const createGroup = async ({ name }: GroupData) => {
  const { data, error } = await supabase
    .from("groups")
    .insert([{ name }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const leaveGroup = async ({ userId, groupId }: LeaveGroupParams) => {
  const { data, error } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("user_id", userId)
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
