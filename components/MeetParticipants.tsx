import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { getFirstLetters } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Text } from "./ui/text";
import { MeetingParticipant } from "~/types/Meeting";

const MeetParticipants = ({
  participants,
}: {
  participants: MeetingParticipant[];
}) => {
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
  participant: MeetingParticipant;
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
