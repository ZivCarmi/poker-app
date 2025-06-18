import { useEffect, useState } from "react";
import { View } from "react-native";
import { getUsers } from "~/lib/utils";
import { Participant } from "~/types/Player";
import { Text } from "./ui/text";

const MeetParticipants = ({ participantsId }: { participantsId: string[] }) => {
  const [participant, setParticipant] = useState<Participant[]>([]);

  useEffect(() => {
    getUsers(participantsId)
      .then((participantsRes) => {
        if (participantsRes && participantsRes.length > 0) {
          setParticipant(participantsRes);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View>
      {participant.map((participant) => (
        <MeetParticipant key={participant.id} participant={participant} />
      ))}
    </View>
  );
};

const MeetParticipant = ({ participant }: { participant: Participant }) => {
  return (
    <View>
      <Text>{participant.username}</Text>
    </View>
  );
};

export default MeetParticipants;
