import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { checkOutMeeting } from "~/api/meetings";
import { CheckInMeetingData } from "~/components/Meetings";
import { MeetingParticipant } from "~/types/Meeting";

const useCheckOutMeeting = () => {
  const { groupId } = useLocalSearchParams();
  const queryClient = useQueryClient();

  return useMutation<MeetingParticipant, Error, CheckInMeetingData>({
    mutationFn: checkOutMeeting,
    onSuccess: (participant) => {
      console.log("Meeting participant checked out successfully:", participant);
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
    onError: (error) => {
      console.error("Error remove meeting participant:", error.message);
    },
  });
};

export default useCheckOutMeeting;
