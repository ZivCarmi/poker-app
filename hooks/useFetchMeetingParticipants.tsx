import { useQuery } from "@tanstack/react-query";
import { fetchMeetingParticipants } from "~/api/meetings";
import { useAuth } from "~/context/auth-context";

const useFetchMeetingParticipants = (meetingId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["meetingParticipants", user?.id],
    enabled: !!user?.id && !!meetingId,
    queryFn: () => fetchMeetingParticipants(meetingId),
  });
};

export default useFetchMeetingParticipants;
