import { View } from "react-native";
import Meetings from "~/components/Meetings";
import { useGroup } from "~/context/group-context";

const Group = () => {
  const { meetings } = useGroup();

  return (
    <View className="flex-1">
      <Meetings meetings={meetings} />
      {/* <RankingTable /> */}
    </View>
  );
};

export default Group;
