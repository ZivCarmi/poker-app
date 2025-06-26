import { User } from "./User";

export type Group = {
  id: string;
  name: string;
  created_by: string;
  created_at: Date;
  invite_token: string;
  invite_token_expires_at: Date;
  members_count: number;
  members: GroupMemberWithUser[];
};

export type GroupMember = {
  group_id: Group["id"];
  user_id: User["id"];
  role: "admin" | "member";
  joined_at: Date;
};

export type GroupMemberWithUser = GroupMember & {
  username: User["username"];
  avatar_url: string;
};
