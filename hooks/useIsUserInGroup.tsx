import { useQuery } from "@tanstack/react-query";
import { isUserInGroup } from "~/api/groups";

export function useIsUserInGroup(groupId?: string, userId?: string) {
  return useQuery({
    queryKey: ["is-user-in-group", groupId, userId],
    queryFn: () => isUserInGroup(groupId, userId),
    enabled: !!groupId && !!userId,
  });
}

export default useIsUserInGroup;
