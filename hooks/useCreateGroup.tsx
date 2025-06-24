import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createGroup } from "~/api/groups";
import { GroupDataWithCreatedBy } from "~/components/NewGroupForm";
import { Group } from "~/types/Group";

const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation<Group, Error, GroupDataWithCreatedBy>({
    mutationFn: createGroup,
    onSuccess: (group) => {
      console.log("Group created successfully:", group);
      queryClient.invalidateQueries({ queryKey: ["groups"] });

      replace({
        pathname: "/[groupId]",
        params: { groupId: group.id },
      });
    },
    onError: (error) => {
      console.error("Error creating group:", error.message);
    },
  });
};

export default useCreateGroup;
