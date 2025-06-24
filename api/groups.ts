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
    .insert({
      group_id: groupId,
      user_id: userId,
    })
    .select()
    .single();

  console.log({ data });
  console.log({ error });

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

export const fetchUserGroup = async (groupId: string) => {
  const { data, error } = await supabase
    .from("groups")
    .select(
      `
      *,
      meetings (
        id, created_by, title, description, location, date, status
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
