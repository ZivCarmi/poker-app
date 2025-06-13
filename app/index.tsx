import { View } from "react-native";
import NewEventButton from "~/components/NewEventButton";
import RankingTable from "~/components/RankingTable";

export default function Screen() {
  return (
    <View className="flex-1">
      <NewEventButton />
      <RankingTable />
    </View>
  );
}
