import { useQuery } from "@tanstack/react-query";
import { fetchUserGroups } from "~/api/groups";
import { useAuth } from "~/context/auth-context";

const useUserGroups = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["groups", user?.id],
    enabled: !!user?.id,
    queryFn: () => fetchUserGroups(user?.id),
  });
};

export default useUserGroups;
