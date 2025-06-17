export type Meeting = {
  id: string;
  createdBy: string;
  date: Date;
  location?: string;
  participants: string[]; // Array of participant IDs or names
  status: "upcoming" | "ongoing" | "completed"; // Status of the event
};
