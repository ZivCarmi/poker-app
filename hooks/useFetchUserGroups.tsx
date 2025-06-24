import { useQuery } from "@tanstack/react-query";
import { fetchUserGroups } from "~/api/groups";
import { useAuth } from "~/context/auth-context";

const useFetchUserGroups = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["groups", user?.id],
    enabled: !!user?.id,
    queryFn: () => fetchUserGroups(user?.id),
  });
};

export default useFetchUserGroups;
