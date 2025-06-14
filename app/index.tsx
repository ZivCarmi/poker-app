import { View } from "react-native";
import Auth from "~/components/Auth";
import NewEventButton from "~/components/NewEventButton";
import RankingTable from "~/components/RankingTable";

export default function Screen() {
  return (
    <View className="flex-1">
      <Auth />
      <NewEventButton />
      <RankingTable />
    </View>
  );
}
