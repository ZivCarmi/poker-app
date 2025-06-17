import { createContext, ReactNode, useContext, useState } from "react";
import { Meeting } from "~/types/Meeting";

type MeetingContextType = {
  meetings: Meeting[];
  addNewMeeting: (newMeeting: Meeting) => void;
};

const MeetingContext = createContext<MeetingContextType>({
  meetings: [],
  addNewMeeting: () => {},
});

export function MeetingProvider({ children }: { children: ReactNode }) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const addNewMeeting = (newMeeting: Meeting) => {
    setMeetings((prevMeetings) => [...prevMeetings, newMeeting]);
  };

  return (
    <MeetingContext.Provider value={{ meetings, addNewMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeeting(): MeetingContextType {
  const context = useContext(MeetingContext);

  if (!context) {
    throw new Error("useMeeting must be used within an MeetingProvider");
  }

  return context;
}
