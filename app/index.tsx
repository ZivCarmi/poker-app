import { View } from "react-native";
import Auth from "~/components/Auth";
import Meetings from "~/components/Meetings";
import NewMeetingButton from "~/components/NewMeetingButton";
import RankingTable from "~/components/RankingTable";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/auth-context";

export default function Home() {
  const { user } = useAuth();

  return (
    <View className="flex-1">
      <Text>{user?.email}</Text>
      <Meetings />
      <Auth />
      {user && <NewMeetingButton />}
      <RankingTable />
    </View>
  );
}
