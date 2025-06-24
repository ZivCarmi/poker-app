import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Muted, P } from "~/components/ui/typography";
import { useAuth } from "~/context/auth-context";
import useFetchGroupByInviteLink from "~/hooks/useFetchGroupByInviteLink";
import useJoinGroup from "~/hooks/useJoinGroup";

export type JoinGroupData = {
  userId: string;
  groupId: string;
};

export default function InvitePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { token } = useLocalSearchParams();
  const {
    data: group,
    isLoading,
    error: fetchGroupError,
  } = useFetchGroupByInviteLink(token as string);
  const { mutate: joinGroup, error: joinGroupError } = useJoinGroup();

  const handleJoin = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (joinGroupError) {
      console.error("Couldn't join group", joinGroupError.message);
      return;
    }

    joinGroup({ userId: user.id, groupId: group.id });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (fetchGroupError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center items-center">
            <CardTitle>Invite Invalid</CardTitle>
            <P>This invite may be expired.</P>
          </CardHeader>
          <CardFooter>
            <Link href="/" asChild>
              <Button className="w-full">
                <Text>Continute to Poker App</Text>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center items-center">
          <Muted>You've been invited to join </Muted>
          <CardTitle>{group.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="self-center">
            <Text>5 Members</Text>
          </Badge>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onPress={handleJoin}>
            <Text>Accept invite</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
