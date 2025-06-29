import { useQuery } from "@tanstack/react-query";
import { fetchGroup } from "~/api/groups";
import { useAuth } from "~/context/auth-context";

const useUserGroup = (groupId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryFn: () => fetchGroup(groupId),
    queryKey: ["group", groupId],
    enabled: !!user?.id && !!groupId,
  });
};

export default useUserGroup;
