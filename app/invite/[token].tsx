import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router";
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
import useGroupByInviteToken from "~/hooks/useGroupByInviteToken";
import useIsUserInGroup from "~/hooks/useIsUserInGroup";
import useJoinGroup from "~/hooks/useJoinGroup";

export type JoinGroupData = {
  userId: string;
  groupId: string;
};

export default function InvitePage() {
  const { user, isReady } = useAuth();
  const router = useRouter();
  const { token } = useLocalSearchParams();
  const {
    data: group,
    isLoading: isGroupLoading,
    error: groupError,
  } = useGroupByInviteToken(token as string);
  const {
    data: isUserInGroup,
    isLoading: isMembershipLoading,
    error: membershipError,
    refetch: refetchIsUserInGroup,
  } = useIsUserInGroup(user?.id, group?.id);
  const { mutate: joinGroup, error: joinGroupError } = useJoinGroup();

  console.log({
    isUserInGroup,
    isMembershipLoading,
    membershipError,
    dependencies: {
      group,
      user: !!user?.id,
    },
  });

  const handleJoin = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    joinGroup({ userId: user.id, groupId: group?.id });

    if (joinGroupError) {
      console.error("Couldn't join group", joinGroupError.message);
      return;
    }
  };

  if (!user && isReady) {
    return (
      <Redirect
        href={{
          pathname: "/login",
          params: { redirect: `/invite/${token}` },
        }}
      />
    );
  }

  if (isGroupLoading || isMembershipLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (membershipError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center items-center gap-2">
            <CardTitle>Invite Invalid</CardTitle>
            <P>Something went wrong. Please try again.</P>
          </CardHeader>
          <CardFooter>
            <Button
              variant="ghost"
              onPress={() => refetchIsUserInGroup()}
              className="w-full"
            >
              <Text>Retry</Text>
            </Button>
            <Muted>Or</Muted>
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

  if (groupError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center items-center gap-2">
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

  if (isUserInGroup) {
    return (
      <Redirect
        href={{
          pathname: "/[groupId]",
          params: { groupId: group.id },
        }}
      />
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center items-center gap-2">
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
