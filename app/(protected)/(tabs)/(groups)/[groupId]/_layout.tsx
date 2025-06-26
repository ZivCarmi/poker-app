import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NewMeetingButton from "~/components/NewMeetingButton";
import { Large } from "~/components/ui/typography";
import { GroupProvider } from "~/context/group-context";
import useFetchGroup from "~/hooks/useFetchGroup";
import { ArrowLeft } from "~/lib/icons/ArrowLeft";

const GroupLayout = () => {
  const { groupId } = useLocalSearchParams();
  const {
    data: group,
    isLoading,
    error,
    refetch,
  } = useFetchGroup(groupId as string);

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
    <GroupProvider group={group}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <View className="flex-row gap-4 items-center pt-2 pb-6 pr-4">
                <Pressable onPress={() => router.back()}>
                  <ArrowLeft className="text-foreground" />
                </Pressable>
                <Link
                  className="grow text-left"
                  href={{
                    pathname: "/[groupId]/group-info",
                    params: { groupId: group.id },
                  }}
                >
                  <Large>{group.name}</Large>
                </Link>
                <NewMeetingButton />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="group-info"
          options={{ headerTitle: "Group info" }}
        />
      </Stack>
    </GroupProvider>
  );
};

export default GroupLayout;
