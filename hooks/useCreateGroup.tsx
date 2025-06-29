import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createGroup } from "~/api/groups";
import { GroupData } from "~/components/NewGroupForm";
import { useAuth } from "~/context/auth-context";
import { Group } from "~/types/Group";

const useCreateGroup = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation<Group, Error, GroupData>({
    mutationFn: createGroup,
    onSuccess: (group) => {
      console.log("Group created successfully:", group);
      queryClient.invalidateQueries({ queryKey: ["groups", user?.id] });

      replace({
        pathname: "/groups/[groupId]",
        params: { groupId: group.id },
      });
    },
    onError: (error) => {
      console.error("Error creating group:", error.message);
    },
  });
};

export default useCreateGroup;
