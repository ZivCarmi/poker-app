import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import useUserGroups from "~/hooks/useUserGroups";
import { ChevronRight } from "~/lib/icons/ChevronRight";

const Groups = () => {
  const { data: groups, isLoading, error, refetch } = useUserGroups();

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

  if (groups?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Muted className="text-center">
          You're not in a group yet.{"\n"}Create or join one to get started!
        </Muted>
      </View>
    );
  }

  return (
    <FlashList
      data={groups}
      estimatedItemSize={43}
      keyExtractor={(item) => item.group_id}
      renderItem={({ item }) => (
        <Link
          className="flex items-center py-2 rtl:bg-black"
          href={{ pathname: "/[groupId]", params: { groupId: item.group_id } }}
        >
          <View className="flex flex-col gap-1 text-left">
            <Large>{item.name}</Large>
          </View>
          <ChevronRight className="text-foreground" />
        </Link>
      )}
    />
  );
};

export default Groups;
