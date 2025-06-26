import { User } from "./User";

export type Meeting = {
  id: string;
  groupId: string;
  created_by: string;
  title?: string;
  description?: string;
  date: Date;
  location?: string;
  status: "upcoming" | "ongoing" | "completed";
  created_at: Date;
  participants_count: number;
};

export type MeetingParticipant = {
  user_id: string;
  username: string;
  avatar_url: User["avatar_url"];
};

export type MeetingWithParticipants = Omit<
  Meeting,
  "groupId" | "created_at"
> & {
  meeting_participants: MeetingParticipant[];
};
