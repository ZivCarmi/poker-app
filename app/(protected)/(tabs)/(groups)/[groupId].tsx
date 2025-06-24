import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { fetchUserGroup } from "~/api/groups";
import Meetings from "~/components/Meetings";
import { Text } from "~/components/ui/text";

const Group = () => {
  const local = useLocalSearchParams();
  const {
    data: group,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["group", local.groupId],
    queryFn: () => fetchUserGroup(local.groupId as string),
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={{ color: "blue", marginTop: 10 }}>נסה שוב</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={{ headerShown: true, title: group.name }} />
      <Meetings meetings={group.meetings} />
      {/* <RankingTable /> */}
    </View>
  );
};

export default Group;
