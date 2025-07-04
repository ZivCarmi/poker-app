import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { checkInMeeting } from "~/api/meetings";
import { CheckInMeetingData } from "~/components/Meetings";
import { MeetingParticipant } from "~/types/Meeting";

const useCheckInMeeting = () => {
  const { groupId } = useLocalSearchParams();
  const queryClient = useQueryClient();

  return useMutation<MeetingParticipant, Error, CheckInMeetingData>({
    mutationFn: checkInMeeting,
    onSuccess: (participant) => {
      console.log("Meeting participant added successfully:", participant);
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
    onError: (error) => {
      console.error("Error add meeting participant:", error.message);
    },
  });
};

export default useCheckInMeeting;
