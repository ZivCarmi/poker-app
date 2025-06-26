import { useQuery } from "@tanstack/react-query";
import { fetchGroup } from "~/api/groups";

const useFetchGroup = (groupId: string) => {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => fetchGroup(groupId as string),
  });
};

export default useFetchGroup;
