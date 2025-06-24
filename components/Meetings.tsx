import { FlashList } from "@shopify/flash-list";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "~/context/auth-context";
import useCheckInMeeting from "~/hooks/useCheckInMeeting";
import useFetchMeetingParticipants from "~/hooks/useFetchMeetingParticipants";
import { MapPin } from "~/lib/icons/MapPin";
import { Meeting } from "~/types/Meeting";
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

type FetchedMeeting = Omit<Meeting, "groupId" | "createdAt">;

export type CheckInMeetingData = {
  checkOut?: boolean;
  userId: string;
  meetingId: string;
};

const Meetings = ({ meetings }: { meetings: FetchedMeeting[] }) => {
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
            <MeetingCardFooter meetingId={meeting.id} />
          </Card>
        )}
      />
    </ScrollView>
  );
};

const MeetingCardFooter = ({ meetingId }: { meetingId: string }) => {
  const { user } = useAuth();
  const {
    data: participants,
    isLoading,
    error,
    refetch,
  } = useFetchMeetingParticipants(meetingId);
  const isCheckedIn = participants?.find(
    (participant) => user?.id === participant.user_id
  );

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
    <CardFooter>
      {participants && <MeetParticipants participants={participants} />}
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

  console.log(meetingId, user?.id);

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
