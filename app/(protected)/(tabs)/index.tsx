import { View } from "react-native";
import Meetings from "~/components/Meetings";
import NewMeetingButton from "~/components/NewMeetingButton";
import RankingTable from "~/components/RankingTable";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/auth-context";

const Home = () => {
  const { user } = useAuth();

  return (
    <View className="px-4">
      <Text className="text-center text-2xl">Poker App</Text>
      <Meetings />
      {user && <NewMeetingButton />}
      <RankingTable />
    </View>
  );
};

export default Home;
