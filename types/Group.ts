import { User } from "./User";

export type Group = {
  id: string;
  name: string;
  created_by: string;
  created_at: Date;
  invite_token: string;
  invite_token_expires_at: Date;
};

export type GroupMember = {
  group_id: Group["id"];
  user_id: User["id"];
  role: "admin" | "member";
  joined_at: Date;
};
