import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInMeeting } from "~/api/meetings";
import { CheckInMeetingData } from "~/components/Meetings";
import { MeetingParticipant } from "~/types/Meeting";

const useCheckInMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation<MeetingParticipant, Error, CheckInMeetingData>({
    mutationFn: checkInMeeting,
    onSuccess: (participant) => {
      console.log("Meeting participant added successfully:", participant);
      queryClient.invalidateQueries({
        queryKey: ["meetingParticipants", participant?.userId],
      });
    },
    onError: (error) => {
      console.error("Error add meeting participant:", error.message);
    },
  });
};

export default useCheckInMeeting;
