import { useQuery } from "@tanstack/react-query";
import { isUserInGroup } from "~/api/groups";

export function useIsUserInGroup(userId?: string, groupId?: string) {
  return useQuery({
    queryKey: ["is-user-in-group", userId, groupId],
    queryFn: () => isUserInGroup(userId, groupId),
    enabled: !!userId && !!groupId,
  });
}

export default useIsUserInGroup;
