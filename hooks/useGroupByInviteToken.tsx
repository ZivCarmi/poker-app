import { useQuery } from "@tanstack/react-query";
import { fetchGroupByInviteToken } from "~/api/groups";

const useGroupByInviteToken = (inviteToken: string) => {
  return useQuery({
    queryKey: ["invites", inviteToken],
    enabled: !!inviteToken,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: () => fetchGroupByInviteToken(inviteToken),
  });
};

export default useGroupByInviteToken;
