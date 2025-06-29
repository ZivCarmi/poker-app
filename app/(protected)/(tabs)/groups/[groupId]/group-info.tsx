import Constants from "expo-constants";
import { Alert, Pressable, View } from "react-native";
import { Button } from "~/components/ui/button";
import { H3, Large, Muted, P } from "~/components/ui/typography";
import { useGroup } from "~/context/group-context";
import { Link2 } from "~/lib/icons/Link2";
import { LogOut } from "~/lib/icons/LogOut";
import * as Clipboard from "expo-clipboard";
import { Text } from "~/components/ui/text";
import { FlashList } from "@shopify/flash-list";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getFirstLetters } from "~/lib/utils";
import useLeaveGroup from "~/hooks/useLeaveGroup";
import { useAuth } from "~/context/auth-context";

const baseUrl =
  Constants.expoConfig?.hostUri?.split(":")[0] || "localhost:8081";

const GroupInfo = () => {
  const { user } = useAuth();
  const {
    id,
    name,
    invite_token,
    members_count,
    members,
    created_at,
    created_by,
  } = useGroup();
  const { mutate } = useLeaveGroup();
  const createdUser = members.find((member) => member.user_id === created_by);

  const copyInviteLink = async () => {
    const testLink = `com.zivcarmi.pokerapp://invite/${invite_token}`;
    // const inviteUrl = `${baseUrl}://invite/${invite_token}`;

    console.log(`npx uri-scheme open ${testLink} --android`);

    // await Clipboard.setStringAsync(inviteUrl);
    // Alert.alert("הקישור הועתק", "שלח אותו למי שתרצה להזמין");
  };

  return (
    <View className="gap-8">
      <View className="items-center gap-2">
        <H3>{name}</H3>
        <Muted>{members_count} members</Muted>
      </View>
      <View>
        <Muted>
          {createdUser && <>Created by {createdUser.username}, </>}
          {new Date(created_at).toLocaleDateString("he-IL")}
        </Muted>
      </View>
      <View className="gap-4">
        <Muted>{members_count} members</Muted>
        <View className="gap-2">
          <Pressable
            className="flex-row items-center gap-4"
            onPress={copyInviteLink}
          >
            <View className="w-10 h-10 rounded-full items-center justify-center bg-primary">
              <Link2 className="text-background" />
            </View>
            <P>Copy Invite Link</P>
          </Pressable>
          <View className="grow flex-row">
            <FlashList
              data={members}
              ItemSeparatorComponent={() => <View className="py-1" />}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={50}
              keyExtractor={(item) => item.user_id}
              renderItem={({ item: groupUser }) => (
                <View className="flex-row items-center gap-4">
                  <Avatar
                    className="w-10 h-10"
                    alt={`${groupUser.username}'s Avatar`}
                  >
                    <AvatarImage source={{ uri: groupUser.avatar_url }} />
                    <AvatarFallback>
                      <Text>{getFirstLetters(groupUser.username)}</Text>
                    </AvatarFallback>
                  </Avatar>
                  <P>{groupUser.username}</P>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      <View>
        <Pressable
          className="flex-row items-center gap-4"
          onPress={() => mutate({ groupId: id, userId: user?.id })}
        >
          <View className="w-10 h-10 rounded-full items-center justify-center">
            <LogOut className="text-destructive" />
          </View>
          <P className="text-destructive">Leave group</P>
        </Pressable>
      </View>
    </View>
  );
};

export default GroupInfo;
