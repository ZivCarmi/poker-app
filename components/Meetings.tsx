import { FlashList } from "@shopify/flash-list";
import { ScrollView, View } from "react-native";
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
            <CardFooter>
              <MeetParticipants meetingId={meeting.id} />
              <Button>
                <Text>Check-in</Text>
              </Button>
            </CardFooter>
          </Card>
        )}
      />
    </ScrollView>
  );
};

export default Meetings;
