import { FlashList } from "@shopify/flash-list";
import { Pressable, ScrollView, View } from "react-native";
import { useAuth } from "~/context/auth-context";
import useCheckInMeeting from "~/hooks/useCheckInMeeting";
import useCheckOutMeeting from "~/hooks/useCheckOutMeeting";
import useDeleteMeeting from "~/hooks/useDeleteMeeting";
import { EllipsisVertical } from "~/lib/icons/EllipsisVertical";
import { MapPin } from "~/lib/icons/MapPin";
import { Trash } from "~/lib/icons/Trash";
import {
  Meeting,
  MeetingParticipant,
  MeetingWithParticipants,
} from "~/types/Meeting";
import MeetParticipants from "./MeetParticipants";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Text } from "./ui/text";
import { Muted, Small } from "./ui/typography";

export type CheckInMeetingData = {
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
            <MeetingCardHeader
              id={meeting.id}
              created_by={meeting.created_by}
              date={meeting.date}
              status={meeting.status}
              description={meeting.description}
              title={meeting.title}
              location={meeting.location}
            />
            <Text>{meeting.id}</Text>
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

const MeetingCardHeader = ({
  id,
  created_by,
  date,
  status,
  title,
  description,
  location,
}: Pick<
  Meeting,
  "id" | "created_by" | "date" | "status" | "title" | "description" | "location"
>) => {
  const { user } = useAuth();
  const { mutate } = useDeleteMeeting();
  const isCreatedByMe = user?.id === created_by;

  return (
    <CardHeader className="gap-3">
      {/* <Text>ID: {id}</Text> */}
      <View className="flex-row justify-between items-center">
        <Muted className="font-medium">
          {new Date(date).toLocaleString("he-IL", {
            timeZone: "Asia/Jerusalem",
          })}
        </Muted>
        <View className="flex-row gap-4 justify-center">
          <Badge variant="outline" className="justify-center">
            <Small className="text-xs uppercase">{status}</Small>
          </Badge>
          {isCreatedByMe && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Pressable>
                  <EllipsisVertical className="text-foreground" />
                </Pressable>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuItem>
                  <Trash className="text-foreground" size={14} />
                  <Text>Edit</Text>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem onPress={() => mutate(id)}>
                  <Trash className="text-foreground" size={14} />
                  <Text>Delete</Text>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </View>
      </View>
      {title && (
        <CardTitle className="flex items-center justify-between">
          {title}
        </CardTitle>
      )}
      {description && <CardDescription>{description}</CardDescription>}
      {location && (
        <View className="flex-row items-center gap-2">
          <MapPin className="text-foreground" />
          <Small>{location}</Small>
        </View>
      )}
    </CardHeader>
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
      {user?.id && (
        <CheckInButton
          isCheckedIn={!!isCheckedIn}
          meetingId={meetingId}
          userId={user.id}
        />
      )}
    </CardFooter>
  );
};

const CheckInButton = ({
  isCheckedIn,
  meetingId,
  userId,
}: {
  isCheckedIn: boolean;
  meetingId: string;
  userId: string;
}) => {
  const { mutate: checkInMutation } = useCheckInMeeting();
  const { mutate: checkOutMutation } = useCheckOutMeeting();

  const checkInOrOut = () => {
    const checkInOrOutData: CheckInMeetingData = { userId, meetingId };

    isCheckedIn
      ? checkOutMutation(checkInOrOutData)
      : checkInMutation(checkInOrOutData);
  };

  return (
    <Button onPress={checkInOrOut}>
      <Text>{isCheckedIn ? "Check-out" : "Check-in"}</Text>
    </Button>
  );
};

export default Meetings;
