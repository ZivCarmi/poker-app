import { View } from "react-native";
import Auth from "~/components/Auth";
import NewMeetingButton from "~/components/NewMeetingButton";
import RankingTable from "~/components/RankingTable";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/auth-context";
import { useMeeting } from "~/context/meeting-context";

export default function Home() {
  const { user } = useAuth();
  const { meetings } = useMeeting();

  return (
    <View className="flex-1">
      <Text>{user?.email}</Text>
      {meetings.map((meet) => (
        <Text key={meet.id}>
          {new Date(meet.date).toLocaleString("he-IL", {
            timeZone: "Asia/Jerusalem",
          })}
        </Text>
      ))}
      <Auth />
      {user && <NewMeetingButton />}
      <RankingTable />
    </View>
  );
}
