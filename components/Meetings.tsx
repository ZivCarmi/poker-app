import { FlashList } from "@shopify/flash-list";
import { ScrollView, View } from "react-native";
import { useAuth } from "~/context/auth-context";
import useCheckInMeeting from "~/hooks/useCheckInMeeting";
import { MapPin } from "~/lib/icons/MapPin";
import { MeetingParticipant, MeetingWithParticipants } from "~/types/Meeting";
import MeetParticipants from "./MeetParticipants";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Text } from "./ui/text";
import { Muted, Small } from "./ui/typography";

export type CheckInMeetingData = {
  checkOut?: boolean;
  userId: string;
  meetingId: string;
};

const Meetings = ({ meetings }: { meetings: MeetingWithParticipants[] }) => {
  if (meetings.length === 0) return null;

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      className="flex-1"
    >
      <FlashList
        data={meetings}
        estimatedItemSize={191}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="py-1" />}
        renderItem={({ item: meeting }) => (
          <Card className="w-full max-w-sm m-auto" key={meeting.id}>
            <CardHeader className="gap-4">
              <View className="flex-row justify-between">
                <Muted className="font-medium">
                  {new Date(meeting.date).toLocaleString("he-IL", {
                    timeZone: "Asia/Jerusalem",
                  })}
                </Muted>
                <Badge variant="outline">
                  <Small className="text-xs uppercase">{meeting.status}</Small>
                </Badge>
              </View>
              {meeting.title && (
                <CardTitle className="flex items-center justify-between">
                  {meeting.title}
                </CardTitle>
              )}
              {meeting.description && (
                <CardDescription>{meeting.description}</CardDescription>
              )}
            </CardHeader>
            {meeting.location && (
              <CardContent className="flex-row items-center gap-2">
                <MapPin className="text-foreground" />
                <Small>{meeting.location}</Small>
              </CardContent>
            )}
            <MeetingCardFooter
              meetingId={meeting.id}
              participants={meeting.meeting_participants}
            />
          </Card>
        )}
      />
    </ScrollView>
  );
};

const MeetingCardFooter = ({
  meetingId,
  participants,
}: {
  meetingId: string;
  participants: MeetingParticipant[];
}) => {
  const { user } = useAuth();
  const isCheckedIn = participants.find(
    (participant) => participant.user_id === user?.id
  );

  return (
    <CardFooter>
      <MeetParticipants participants={participants} />
      <CheckInButton isCheckedIn={!!isCheckedIn} meetingId={meetingId} />
    </CardFooter>
  );
};

const CheckInButton = ({
  isCheckedIn,
  meetingId,
}: {
  isCheckedIn: boolean;
  meetingId: string;
}) => {
  const { user } = useAuth();
  const { mutate } = useCheckInMeeting();

  const checkIn = () => {
    if (!user) {
      console.error("Unauthenticated user");
      return;
    }

    if (isCheckedIn) {
      console.log("checked in returning...");
      return;
    }

    const checkInMeetingData: CheckInMeetingData = {
      userId: user.id,
      meetingId,
    };

    mutate(checkInMeetingData);
  };

  return (
    <Button onPress={checkIn}>
      <Text>{isCheckedIn ? "Check-out" : "Check-in"}</Text>
    </Button>
  );
};

export default Meetings;
