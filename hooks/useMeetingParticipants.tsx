import { useQuery } from "@tanstack/react-query";
import { fetchMeetingParticipants } from "~/api/meetings";
import { useAuth } from "~/context/auth-context";

const useMeetingParticipants = (meetingId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["group", meetingId],
    enabled: !!user?.id && !!meetingId,
    queryFn: () => fetchMeetingParticipants(meetingId),
  });
};

export default useMeetingParticipants;
