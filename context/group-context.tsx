import { createContext, ReactNode, useContext } from "react";
import { Group } from "~/types/Group";
import { MeetingWithParticipants } from "~/types/Meeting";

type GroupContextType = Group & {
  meetings: MeetingWithParticipants[];
};

const GroupContext = createContext<GroupContextType>({
  id: "",
  name: "",
  created_by: "",
  created_at: new Date(),
  invite_token: "",
  invite_token_expires_at: new Date(),
  meetings: [],
});

export function GroupProvider({
  group,
  children,
}: {
  group: GroupContextType;
  children: ReactNode;
}) {
  return (
    <GroupContext.Provider value={group}>{children}</GroupContext.Provider>
  );
}

export function useGroup() {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error("useGroup must be used within an GroupProvider");
  }

  return context;
}
