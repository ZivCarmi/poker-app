import Constants from "expo-constants";
import { Alert, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Large } from "~/components/ui/typography";
import { useGroup } from "~/context/group-context";
import { Link2 } from "~/lib/icons/Link2";
import * as Clipboard from "expo-clipboard";

const baseUrl =
  Constants.expoConfig?.hostUri?.split(":")[0] || "localhost:8081";

const Members = () => {
  const { invite_token } = useGroup();

  const copyInviteLink = async () => {
    const testLink = `com.zivcarmi.pokerapp://invite/${invite_token}`;
    // const inviteUrl = `${baseUrl}://invite/${invite_token}`;

    console.log(`npx uri-scheme open ${testLink} --android`);

    // await Clipboard.setStringAsync(inviteUrl);
    // Alert.alert("הקישור הועתק", "שלח אותו למי שתרצה להזמין");
  };

  return (
    <View>
      <Button
        variant="ghost"
        className="h-auto native:h-auto flex-row items-center justify-start gap-8"
        onPress={copyInviteLink}
      >
        <View className="w-10 h-10 rounded-full items-center justify-center bg-primary">
          <Link2 className="text-background" />
        </View>
        <Large>Copy Invite Link</Large>
      </Button>
    </View>
  );
};

export default Members;
