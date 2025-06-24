import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import useFetchMeetingParticipants from "~/hooks/useFetchMeetingParticipants";
import { Text } from "./ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getFirstLetters } from "~/lib/utils";

type FetchedMeetParticipant = {
  user_id: string;
  username: string;
  avatar_url?: string;
};

const MeetParticipants = ({ meetingId }: { meetingId: string }) => {
  const {
    data: participants,
    isLoading,
    error,
    refetch,
  } = useFetchMeetingParticipants(meetingId);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={{ color: "blue", marginTop: 10 }}>נסה שוב</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlashList
      data={participants}
      estimatedItemSize={43}
      renderItem={({ item: participant }) => (
        <MeetParticipant key={participant.user_id} participant={participant} />
      )}
    />
  );
};

const MeetParticipant = ({
  participant,
}: {
  participant: FetchedMeetParticipant;
}) => {
  return (
    <View>
      <Avatar alt={`${participant.username}'s Avatar`}>
        <AvatarImage source={{ uri: participant.avatar_url }} />
        <AvatarFallback>
          <Text>{getFirstLetters(participant.username)}</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
};

export default MeetParticipants;
