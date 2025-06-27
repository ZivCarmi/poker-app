import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { getFirstLetters } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Text } from "./ui/text";
import { MeetingParticipant } from "~/types/Meeting";

// NEED TO HANDLE 4 MAX
// IF MORE THAN 4 SHOW +{number}
const MeetParticipants = ({
  participants,
}: {
  participants: MeetingParticipant[];
}) => {
  return (
    <View className="grow flex-row">
      {participants.map((participant, index) => (
        <MeetParticipant
          className={index !== 0 ? "-ms-1" : undefined}
          key={participant.user_id}
          participant={participant}
        />
      ))}
    </View>
  );
};

const MeetParticipant = ({
  participant,
  className,
}: {
  participant: MeetingParticipant;
  className?: string;
}) => {
  return (
    <View className={className}>
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
