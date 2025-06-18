import { useMeeting } from "~/context/meeting-context";
import MeetParticipants from "./MeetParticipants";
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

const Meetings = () => {
  const { meetings } = useMeeting();

  if (meetings.length === 0) return null;

  return meetings.map((meet) => (
    <Card className="w-full max-w-sm" key={meet.id}>
      <CardHeader>
        <CardTitle>
          {new Date(meet.date).toLocaleString("he-IL", {
            timeZone: "Asia/Jerusalem",
          })}
        </CardTitle>
        <CardDescription>{meet.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Check-ins:</Text>
        <MeetParticipants participantsId={meet.participants} />
      </CardContent>
      <CardFooter>
        <Button>
          <Text>Check-in</Text>
        </Button>
      </CardFooter>
    </Card>
  ));
};

export default Meetings;
