import { View } from "react-native";
import Auth from "~/components/Auth";
import NewEventButton from "~/components/NewEventButton";
import RankingTable from "~/components/RankingTable";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/auth-context";

export default function Screen() {
  const { user, loading } = useAuth();

  return (
    <View className="flex-1">
      <Text>{user?.email}</Text>
      <Auth />
      <NewEventButton />
      <RankingTable />
    </View>
  );
}
