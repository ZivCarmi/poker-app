export type Meeting = {
  id: string;
  groupId: string;
  createdBy: string;
  title?: string;
  description?: string;
  date: Date;
  location?: string;
  status: "upcoming" | "ongoing" | "completed";
  createdAt: Date;
};

export type MeetingParticipant = {
  userId: string;
  meetingId: string;
  joinedAt: string;
};
