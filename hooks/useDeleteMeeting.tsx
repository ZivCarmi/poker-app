import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { deleteMeeting } from "~/api/meetings";
import { Meeting } from "~/types/Meeting";

const useDeleteMeeting = () => {
  const queryClient = useQueryClient();
  const global = useGlobalSearchParams();

  return useMutation<any, Error, Meeting["id"]>({
    mutationFn: deleteMeeting,
    onSuccess: (meeting) => {
      console.log("Meeting deleted successfully:", meeting);
      queryClient.invalidateQueries({ queryKey: ["group", global.groupId] });
    },
    onError: (error) => {
      console.error("Error deleting meeting:", error.message);
    },
  });
};

export default useDeleteMeeting;
