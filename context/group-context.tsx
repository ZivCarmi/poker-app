import { createContext, ReactNode, useContext, useState } from "react";
import { Group } from "~/types/Group";

type GroupContextType = {
  groups: Group[];
  addNewGroup: (newGroup: Group) => void;
};

const GroupContext = createContext<GroupContextType>({
  groups: [],
  addNewGroup: () => {},
});

export function GroupProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Group[]>([]);

  const addNewGroup = (newGroup: Group) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  return (
    <GroupContext.Provider value={{ groups, addNewGroup }}>
      {children}
    </GroupContext.Provider>
  );
}

export function useGroup(): GroupContextType {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error("useGroup must be used within an GroupProvider");
  }

  return context;
}
