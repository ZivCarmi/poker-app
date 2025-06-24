import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { joinGroup } from "~/api/groups";
import { JoinGroupData } from "~/app/invite/[token]";
import { GroupMember } from "~/types/Group";

const useJoinGroup = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation<GroupMember, Error, JoinGroupData>({
    mutationFn: joinGroup,
    onSuccess: (group) => {
      console.log("Successfully joined group:", group);
      queryClient.invalidateQueries({ queryKey: ["group", group.groupId] });

      replace({
        pathname: "/[groupId]",
        params: { groupId: group.groupId },
      });
    },
    onError: (error) => {
      console.error("Failed to join group:", error.message);
    },
  });
};

export default useJoinGroup;
