import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { leaveGroup } from "~/api/groups";
import { GroupMember } from "~/types/Group";

export type LeaveGroupParams = {
  groupId: string;
  userId?: string;
};

const useLeaveGroup = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation<GroupMember, Error, LeaveGroupParams>({
    mutationFn: leaveGroup,
    onSuccess: (user) => {
      console.log("User left group successfully:", user);
      queryClient.invalidateQueries({ queryKey: ["groups", user.user_id] });
      queryClient.invalidateQueries({ queryKey: ["group", user.group_id] });
      replace("/groups"); // NEED TO REPLACE ALL RELEVANT HISTORY FOR THE GROUP
    },
    onError: (error) => {
      console.error("Error leaving group:", error.message);
    },
  });
};

export default useLeaveGroup;
