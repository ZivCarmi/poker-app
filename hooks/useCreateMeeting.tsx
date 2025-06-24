import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { createMeeting } from "~/api/meetings";
import { MeetingDataWithGroupIdAndCreatedBy } from "~/components/NewMeetingForm";
import { Meeting } from "~/types/Meeting";

const useCreateMeeting = () => {
  const queryClient = useQueryClient();
  const global = useGlobalSearchParams();

  return useMutation<Meeting, Error, MeetingDataWithGroupIdAndCreatedBy>({
    mutationFn: createMeeting,
    onSuccess: (meeting) => {
      console.log("Meeting created successfully:", meeting);
      queryClient.invalidateQueries({ queryKey: ["group", global.groupId] });
    },
    onError: (error) => {
      console.error("Error creating meeting:", error.message);
    },
  });
};

export default useCreateMeeting;
