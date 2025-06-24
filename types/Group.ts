import { User } from "./User";

export type Group = {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
};

export type GroupMember = {
  groupId: Group["id"];
  userId: User["id"];
  role: "admin" | "member";
  joinedAt: Date;
};
